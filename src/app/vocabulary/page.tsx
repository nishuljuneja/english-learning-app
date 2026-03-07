'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { allVocabulary, getVocabularyByLevel, getVocabularyByIds } from '@/content/vocabulary';
import { Flashcard, LevelBadge, FillBlank, MultipleChoice, ScoreCard, ProgressBar } from '@/components/Exercises';
import { BookOpen, Search, Filter, RotateCcw, Brain, Volume2, Lock } from 'lucide-react';
import { useIndianVoice } from '@/lib/useIndianVoice';
import type { CEFRLevel, VocabularyWord } from '@/lib/firestore';
import { updateUserProfile, addXP, updateStreak, updateVocabularyProgress, incrementWordsLearned } from '@/lib/firestore';
import { isPro, isLevelAccessible } from '@/lib/subscription';
import ProGate from '@/components/ProGate';

/**
 * Try to find the target word (or common inflections) inside a sentence.
 * Returns { sentence: string (with _____ inserted), matched: string (the form found), alts: string[] }.
 * If no match is found, returns null.
 */
function blankOutWord(
  sentence: string,
  baseWord: string
): { sentence: string; matched: string; alts: string[] } | null {
  const w = baseWord.toLowerCase();
  // Generate common inflected forms to try
  const variants: string[] = [w];
  // -s / -es
  variants.push(w + 's', w + 'es');
  // -ed
  if (w.endsWith('e')) {
    variants.push(w + 'd');
  } else if (/[^aeiou]y$/.test(w)) {
    variants.push(w.slice(0, -1) + 'ied');
  } else if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
    variants.push(w + w.slice(-1) + 'ed');
  }
  variants.push(w + 'ed');
  // -ing
  if (w.endsWith('e') && !w.endsWith('ee')) {
    variants.push(w.slice(0, -1) + 'ing');
  } else if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
    variants.push(w + w.slice(-1) + 'ing');
  }
  variants.push(w + 'ing');
  // -er / -est
  if (w.endsWith('e')) {
    variants.push(w + 'r', w + 'st');
  } else if (/[^aeiou]y$/.test(w)) {
    variants.push(w.slice(0, -1) + 'ier', w.slice(0, -1) + 'iest');
  }
  variants.push(w + 'er', w + 'est');
  // -ly
  variants.push(w + 'ly');
  // -tion / -ness
  variants.push(w + 'tion', w + 'ness');
  // un-
  if (w.startsWith('un')) variants.push(w.slice(2));

  // Sort longest first so we match the most specific form
  const unique = [...new Set(variants)].sort((a, b) => b.length - a.length);

  for (const form of unique) {
    const escaped = form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`, 'i');
    const match = sentence.match(re);
    if (match) {
      const actual = match[0]; // preserve original casing
      const blanked = sentence.replace(re, '_____');
      // Collect alternative accepted answers: both the matched form and the base word
      const alts = [actual.toLowerCase(), w].filter((v, i, arr) => arr.indexOf(v) === i && v !== actual.toLowerCase());
      return { sentence: blanked, matched: actual, alts: alts.map(a => a) };
    }
  }
  return null;
}

/** Fisher-Yates shuffle (returns new array) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Mode = 'browse' | 'flashcards' | 'fill-blanks' | 'quiz' | 'review';
const DRILL_SIZE = 10; // questions per round
const REVIEW_SIZE = 15; // flashcards per review session

// ── Studied-words tracking via localStorage ──
const STUDIED_KEY_PREFIX = 'speakeasy-studied-';

function getStudiedWordIds(uid: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STUDIED_KEY_PREFIX + uid);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function markWordStudied(uid: string, wordId: string) {
  if (typeof window === 'undefined') return;
  const ids = getStudiedWordIds(uid);
  if (!ids.includes(wordId)) {
    ids.push(wordId);
    localStorage.setItem(STUDIED_KEY_PREFIX + uid, JSON.stringify(ids));
  }
}

export default function VocabularyPage() {
  const { profile, uiLanguage, setProfile } = useAppStore();
  const { speak, isPlaying } = useIndianVoice();
  const currentLevel = profile?.currentLevel || 'A1';
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(currentLevel);
  const [mode, setMode] = useState<Mode>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(0); // bump to reshuffle

  // Review mode state
  const [reviewWords, setReviewWords] = useState<VocabularyWord[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [reviewKnewCount, setReviewKnewCount] = useState(0);

  // Read ?mode=review from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'review') {
      setMode('review');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load review words once profile is available when in review mode
  useEffect(() => {
    if (mode === 'review' && profile) {
      loadReviewWords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, profile]);

  // Drill / quiz state
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillScore, setDrillScore] = useState(0);
  const [drillDone, setDrillDone] = useState(false);
  const [drillKey, setDrillKey] = useState(0); // forces component remount between questions

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const browseWords = getVocabularyByLevel(selectedLevel).filter((w) =>
    searchQuery
      ? w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.meaning.en.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  // Shuffled words for flashcard mode — reshuffles on level change or explicit reshuffle
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const flashcardWords = useMemo(() => shuffle(getVocabularyByLevel(selectedLevel)), [selectedLevel, shuffleSeed]);

  // Drill words (fill-blanks & quiz) — pick DRILL_SIZE random words that have definitions
  const drillWords = useMemo(() => {
    const eligible = getVocabularyByLevel(selectedLevel).filter(
      (w) => w.example && w.meaning.en && w.meaning.en !== w.word
    );
    return shuffle(eligible).slice(0, DRILL_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLevel, shuffleSeed]);

  // Generate multiple-choice distractors from same level
  const quizOptions = useMemo(() => {
    const allLevel = getVocabularyByLevel(selectedLevel).filter(
      (w) => w.meaning.en && w.meaning.en !== w.word
    );
    return drillWords.map((word) => {
      const others = shuffle(
        allLevel.filter((w) => w.id !== word.id)
      )
        .slice(0, 3)
        .map((w) => w.meaning[uiLanguage] || w.meaning.en);
      const correct = word.meaning[uiLanguage] || word.meaning.en;
      return shuffle([correct, ...others]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drillWords, uiLanguage]);

  const currentWord = mode === 'flashcards' ? flashcardWords[flashcardIndex] : browseWords[flashcardIndex];

  const resetDrill = useCallback(() => {
    setDrillIndex(0);
    setDrillScore(0);
    setDrillDone(false);
    setDrillKey(0);
    setShuffleSeed((s) => s + 1);
  }, []);

  // Track answer correctness, advance only when user clicks Next
  const handleDrillAnswer = useCallback(
    (correct: boolean) => {
      if (correct) setDrillScore((s) => s + 1);
      // Mark word as studied for review
      if (profile && drillWords[drillIndex]) {
        markWordStudied(profile.uid, drillWords[drillIndex].id);
      }
    },
    [profile, drillWords, drillIndex]
  );

  const advanceDrill = useCallback(
    () => {
      if (drillIndex + 1 >= drillWords.length) {
        setDrillDone(true);
        // Persist vocabulary progress
        if (profile) {
          const finalScore = drillScore;
          const pct = Math.round((finalScore / drillWords.length) * 100);
          const newVocabScore = Math.max(profile.skillScores.vocabulary, pct);
          const skillUpdates = {
            skillScores: { ...profile.skillScores, vocabulary: newVocabScore },
          };
          updateUserProfile(profile.uid, skillUpdates).catch(() => {});
          incrementWordsLearned(profile.uid, drillWords.length).catch(() => {});
          addXP(profile.uid, finalScore * 5).catch(() => {});
          updateStreak(profile.uid).then((streakData) => {
            setProfile({
              ...profile,
              ...skillUpdates,
              wordsLearned: profile.wordsLearned + drillWords.length,
              xp: profile.xp + finalScore * 5,
              streak: streakData.streak,
              lastActiveDate: streakData.lastActiveDate,
            });
          }).catch(() => {
            setProfile({
              ...profile,
              ...skillUpdates,
              wordsLearned: profile.wordsLearned + drillWords.length,
              xp: profile.xp + finalScore * 5,
            });
          });
        }
      } else {
        setDrillIndex((i) => i + 1);
        setDrillKey((k) => k + 1);
      }
    },
    [drillIndex, drillWords.length, drillScore, profile, setProfile]
  );

  // Track flashcard progress
  const handleFlashcardRate = useCallback(
    (quality: number) => {
      if (profile) {
        // Mark word as studied for review
        const word = flashcardWords[flashcardIndex];
        if (word) markWordStudied(profile.uid, word.id);

        incrementWordsLearned(profile.uid, 1).catch(() => {});
        addXP(profile.uid, quality >= 3 ? 5 : 2).catch(() => {});
        const xpGain = quality >= 3 ? 5 : 2;
        updateStreak(profile.uid).then((streakData) => {
          setProfile({
            ...profile,
            wordsLearned: profile.wordsLearned + 1,
            xp: profile.xp + xpGain,
            streak: streakData.streak,
            lastActiveDate: streakData.lastActiveDate,
          });
        }).catch(() => {
          setProfile({
            ...profile,
            wordsLearned: profile.wordsLearned + 1,
            xp: profile.xp + xpGain,
          });
        });
      }
      if (flashcardIndex < flashcardWords.length - 1) {
        setFlashcardIndex(flashcardIndex + 1);
      } else {
        setFlashcardIndex(0);
      }
    },
    [profile, setProfile, flashcardIndex, flashcardWords.length, flashcardWords]
  );

  // Handle review flashcard rating — updates spaced repetition in Firestore
  const handleReviewRate = useCallback(
    (quality: number) => {
      const word = reviewWords[reviewIndex];
      if (profile && word) {
        // Update spaced repetition progress in Firestore
        updateVocabularyProgress(profile.uid, word.id, quality).catch(() => {});
        addXP(profile.uid, quality >= 3 ? 5 : 2).catch(() => {});
        const xpGain = quality >= 3 ? 5 : 2;
        updateStreak(profile.uid).then((streakData) => {
          setProfile({
            ...profile,
            xp: profile.xp + xpGain,
            streak: streakData.streak,
            lastActiveDate: streakData.lastActiveDate,
          });
        }).catch(() => {
          setProfile({ ...profile, xp: profile.xp + xpGain });
        });
      }
      setReviewedCount((c) => c + 1);
      if (quality >= 3) setReviewKnewCount((c) => c + 1);

      if (reviewIndex < reviewWords.length - 1) {
        setReviewIndex((i) => i + 1);
      } else {
        // Finished all review cards — stay on summary
        setReviewIndex(reviewWords.length); // triggers summary view
      }
    },
    [profile, setProfile, reviewWords, reviewIndex]
  );

  const switchMode = (m: Mode) => {
    setMode(m);
    setFlashcardIndex(0);
    if (m === 'flashcards' || m === 'fill-blanks' || m === 'quiz') {
      setShuffleSeed((s) => s + 1);
    }
    if (m === 'fill-blanks' || m === 'quiz') {
      setDrillIndex(0);
      setDrillScore(0);
      setDrillDone(false);
      setDrillKey(0);
    }
    if (m === 'review') {
      loadReviewWords();
    }
  };

  const loadReviewWords = useCallback(() => {
    if (!profile) { setReviewWords([]); return; }
    const studiedIds = getStudiedWordIds(profile.uid);
    if (studiedIds.length === 0) { setReviewWords([]); return; }
    const studied = getVocabularyByIds(studiedIds);
    // Fisher-Yates shuffle
    const arr = [...studied];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setReviewWords(arr.slice(0, REVIEW_SIZE));
    setReviewIndex(0);
    setReviewedCount(0);
    setReviewKnewCount(0);
  }, [profile]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.vocabulary', uiLanguage)}</h1>
            <p className="text-gray-500 text-sm">
              {allVocabulary.length} words from Oxford 3000 + 5000
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 flex-wrap gap-1">
          {([
            { key: 'browse', label: 'Browse' },
            { key: 'flashcards', label: 'Flashcards' },
            { key: 'fill-blanks', label: 'Fill Blanks' },
            { key: 'quiz', label: 'Quiz' },
            { key: 'review', label: '🔄 Review' },
          ] as { key: Mode; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                mode === key ? 'bg-white shadow text-indigo-600' : 'text-gray-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {levels.map((level) => {
          const count = getVocabularyByLevel(level).length;
          const locked = !isLevelAccessible(level, profile);
          return (
            <button
              key={level}
              onClick={() => { if (!locked) { setSelectedLevel(level); setFlashcardIndex(0); setShuffleSeed(s => s + 1); } }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                locked
                  ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  : selectedLevel === level
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={locked ? 'Upgrade to Pro' : undefined}
            >
              {level} ({count}) {locked && <Lock className="inline w-3 h-3 ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Pro gate for locked level */}
      {!isLevelAccessible(selectedLevel, profile) && (
        <ProGate feature={`${selectedLevel} Vocabulary`} />
      )}

      {/* Flashcard Mode */}
      {isLevelAccessible(selectedLevel, profile) && mode === 'flashcards' && flashcardWords.length > 0 && currentWord && (
        <div className="py-8">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-4">
            <span>{flashcardIndex + 1} / {flashcardWords.length}</span>
            <button
              onClick={() => { setShuffleSeed(s => s + 1); setFlashcardIndex(0); }}
              className="text-indigo-500 hover:text-indigo-700 font-medium transition"
            >
              ↻ Shuffle
            </button>
          </div>
          <Flashcard
            front={currentWord.word}
            back={currentWord.meaning[uiLanguage] || currentWord.meaning.en}
            pronunciation={currentWord.pronunciation}
            partOfSpeech={currentWord.partOfSpeech}
            example={currentWord.example}
            onRate={handleFlashcardRate}
          />
        </div>
      )}

      {/* Review Mode */}
      {isLevelAccessible(selectedLevel, profile) && mode === 'review' && (
        <div className="py-8">
          {reviewWords.length === 0 ? (
            <div className="text-center py-16">
              <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No words to review yet</h3>
              <p className="text-gray-400 mb-6">
                Study some words first using Flashcards, Fill Blanks, or Quiz mode.<br />
                Then come back here to review them!
              </p>
              <button
                onClick={() => switchMode('flashcards')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
              >
                Start Learning
              </button>
            </div>
          ) : reviewIndex >= reviewWords.length ? (
            /* Review complete summary */
            <div className="max-w-md mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Review Complete!</h3>
                <p className="text-gray-500 mb-6">
                  You reviewed {reviewedCount} word{reviewedCount !== 1 ? 's' : ''}
                </p>
                <div className="flex justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{reviewKnewCount}</div>
                    <div className="text-sm text-gray-400">Knew it</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">{reviewedCount - reviewKnewCount}</div>
                    <div className="text-sm text-gray-400">Need practice</div>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => { loadReviewWords(); }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Review Again
                  </button>
                  <button
                    onClick={() => switchMode('browse')}
                    className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition"
                  >
                    Back to Browse
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active review flashcard */
            <>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  Review: {reviewIndex + 1} / {reviewWords.length}
                </span>
              </div>
              <Flashcard
                front={reviewWords[reviewIndex].word}
                back={reviewWords[reviewIndex].meaning[uiLanguage] || reviewWords[reviewIndex].meaning.en}
                pronunciation={reviewWords[reviewIndex].pronunciation}
                partOfSpeech={reviewWords[reviewIndex].partOfSpeech}
                example={reviewWords[reviewIndex].example}
                onRate={handleReviewRate}
              />
            </>
          )}
        </div>
      )}

      {/* Fill in the Blanks Mode */}
      {isLevelAccessible(selectedLevel, profile) && mode === 'fill-blanks' && (
        <div className="py-8">
          {drillDone ? (
            <ScoreCard
              score={drillScore}
              total={drillWords.length}
              onRetry={resetDrill}
              onContinue={() => switchMode('browse')}
            />
          ) : drillWords.length > 0 ? (
            <>
              <ProgressBar current={drillIndex + 1} total={drillWords.length} label="Fill in the Blanks" />
              <div className="mt-6" key={drillKey}>
                {(() => {
                  const w = drillWords[drillIndex];
                  const result = w.example ? blankOutWord(w.example, w.word) : null;
                  const question = result
                    ? result.sentence
                    : `Use the correct word: _____.`;
                  const correctAns = result ? result.matched : w.word;
                  const altAnswers = result
                    ? [w.word, ...(result.alts || [])]
                    : [];
                  return (
                    <FillBlank
                      question={question}
                      correctAnswer={correctAns}
                      acceptedAnswers={altAnswers}
                      definition={w.meaning[uiLanguage] || w.meaning.en}
                      partOfSpeech={w.partOfSpeech}
                      explanation={`${w.word} — ${w.meaning[uiLanguage] || w.meaning.en}${w.example ? `\nExample: "${w.example}"` : ''}`}
                      onAnswer={handleDrillAnswer}
                      onNext={advanceDrill}
                    />
                  );
                })()}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>Not enough words with example sentences at this level.</p>
            </div>
          )}
        </div>
      )}

      {/* Multiple Choice Quiz Mode */}
      {isLevelAccessible(selectedLevel, profile) && mode === 'quiz' && (
        <div className="py-8">
          {drillDone ? (
            <ScoreCard
              score={drillScore}
              total={drillWords.length}
              onRetry={resetDrill}
              onContinue={() => switchMode('browse')}
            />
          ) : drillWords.length > 0 && quizOptions[drillIndex] ? (
            <>
              <ProgressBar current={drillIndex + 1} total={drillWords.length} label="Vocabulary Quiz" />
              <div className="mt-6" key={drillKey}>
                <MultipleChoice
                  question={`What does "${drillWords[drillIndex].word}" mean?`}
                  options={quizOptions[drillIndex]}
                  correctAnswer={
                    drillWords[drillIndex].meaning[uiLanguage] || drillWords[drillIndex].meaning.en
                  }
                  explanation={
                    drillWords[drillIndex].example
                      ? `Example: "${drillWords[drillIndex].example}"`
                      : undefined
                  }
                  onAnswer={handleDrillAnswer}
                  onNext={advanceDrill}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>Not enough words with definitions at this level.</p>
            </div>
          )}
        </div>
      )}

      {/* Browse Mode */}
      {isLevelAccessible(selectedLevel, profile) && mode === 'browse' && (
        <>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Word List */}
          <div className="space-y-3">
            {browseWords.map((word) => (
              <div
                key={word.id}
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{word.word}</h3>
                      <button
                        onClick={() => speak(word.word)}
                        className="p-1 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-gray-400 italic">{word.partOfSpeech}</span>
                      {word.pronunciation && (
                        <span className="text-xs text-gray-400">{word.pronunciation}</span>
                      )}
                    </div>
                    <p className="text-gray-600">
                      {word.meaning[uiLanguage] || word.meaning.en}
                    </p>
                    {word.example && (
                      <p className="text-sm text-gray-400 mt-1 italic">&ldquo;{word.example}&rdquo;</p>
                    )}
                    {word.exampleTranslation[uiLanguage] && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        → {word.exampleTranslation[uiLanguage]}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <LevelBadge level={word.level} size="sm" />
                    <div className="flex gap-1 mt-1">
                      {word.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {browseWords.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No words found for this level yet.</p>
                <p className="text-sm mt-1">Import your Oxford word lists to populate this section.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
