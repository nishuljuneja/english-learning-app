'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Flashcard, MultipleChoice, FillBlank, ScoreCard, ProgressBar } from '@/components/Exercises';
import { getVocabularyByLevel } from '@/content/vocabulary';
import { getGrammarLessonsByLevel } from '@/content/grammar-lessons';
import { getReadingPassagesByLevel } from '@/content/reading-passages';
import {
  Sparkles, BookOpen, Brain, BookOpenCheck, ArrowRight,
  CheckCircle2, Zap, Target, Volume2,
} from 'lucide-react';
import { addXP, updateStreak, incrementWordsLearned, updateUserProfile } from '@/lib/firestore';
import { useIndianVoice } from '@/lib/useIndianVoice';
import type { CEFRLevel, VocabularyWord } from '@/lib/firestore';

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ──── Practice item types ────────────────────────────────────────────
interface VocabFlashcardItem {
  type: 'vocab-flashcard';
  word: VocabularyWord;
}

interface VocabQuizItem {
  type: 'vocab-quiz';
  word: VocabularyWord;
  options: string[];
}

interface GrammarItem {
  type: 'grammar';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ReadingItem {
  type: 'reading';
  passage: string;
  title: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

type PracticeItem = VocabFlashcardItem | VocabQuizItem | GrammarItem | ReadingItem;

const DAILY_ITEMS = 10; // number of items per session

export default function DailyPracticePage() {
  const { profile, uiLanguage, setProfile, loading, refreshProfile } = useAppStore();
  const { speak } = useIndianVoice();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [itemKey, setItemKey] = useState(0);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const currentLevel = (profile?.currentLevel || 'A1') as CEFRLevel;

  // Generate a mixed practice session
  const items: PracticeItem[] = useMemo(() => {
    if (!profile) return [];

    const vocab = shuffle(getVocabularyByLevel(currentLevel).filter(w => w.meaning.en && w.meaning.en !== w.word));
    const grammarLessons = getGrammarLessonsByLevel(currentLevel);
    const readings = getReadingPassagesByLevel(currentLevel);

    const result: PracticeItem[] = [];

    // 3 vocab flashcards
    for (let i = 0; i < Math.min(3, vocab.length); i++) {
      result.push({ type: 'vocab-flashcard', word: vocab[i] });
    }

    // 3 vocab quizzes
    for (let i = 3; i < Math.min(6, vocab.length); i++) {
      const word = vocab[i];
      const others = shuffle(vocab.filter(w => w.id !== word.id)).slice(0, 3)
        .map(w => w.meaning[uiLanguage] || w.meaning.en);
      const correct = word.meaning[uiLanguage] || word.meaning.en;
      result.push({
        type: 'vocab-quiz',
        word,
        options: shuffle([correct, ...others]),
      });
    }

    // 2 grammar questions
    const allExercises = grammarLessons.flatMap(l => l.exercises.filter(e => e.type === 'multiple-choice'));
    const grammarPicks = shuffle(allExercises).slice(0, 2);
    for (const ex of grammarPicks) {
      result.push({
        type: 'grammar',
        question: ex.question,
        options: ex.options || [],
        correctAnswer: Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer,
        explanation: ex.explanation,
      });
    }

    // 2 reading questions
    const readingPicks = shuffle(readings).slice(0, 2);
    for (const rp of readingPicks) {
      const q = rp.questions.find(q => q.type === 'multiple-choice') || rp.questions[0];
      if (q) {
        result.push({
          type: 'reading',
          passage: rp.content.slice(0, 300) + (rp.content.length > 300 ? '...' : ''),
          title: rp.title,
          question: q.question,
          options: q.options || [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        });
      }
    }

    return shuffle(result).slice(0, DAILY_ITEMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, currentLevel, uiLanguage]);

  const handleAnswer = useCallback((correct: boolean) => {
    if (correct) setScore(s => s + 1);
  }, []);

  const advance = useCallback(() => {
    if (index + 1 >= items.length) {
      setDone(true);
      // Persist progress
      if (profile) {
        const xpEarned = score * 10;
        addXP(profile.uid, xpEarned).catch(() => {});
        incrementWordsLearned(profile.uid, 3).catch(() => {});
        updateStreak(profile.uid).then((streakData) => {
          setProfile({
            ...profile,
            xp: profile.xp + xpEarned,
            wordsLearned: profile.wordsLearned + 3,
            streak: streakData.streak,
            lastActiveDate: streakData.lastActiveDate,
          });
        }).catch(() => {
          setProfile({
            ...profile,
            xp: profile.xp + xpEarned,
            wordsLearned: profile.wordsLearned + 3,
          });
        });
      }
    } else {
      setIndex(i => i + 1);
      setItemKey(k => k + 1);
    }
  }, [index, items.length, score, profile, setProfile]);

  const handleFlashcardRate = useCallback((quality: number) => {
    if (quality >= 3) setScore(s => s + 1);
    advance();
  }, [advance]);

  const restart = useCallback(() => {
    setStarted(false);
    setIndex(0);
    setScore(0);
    setDone(false);
    setItemKey(0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in for Daily Practice</h1>
        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
          {t('common.login', uiLanguage)} →
        </Link>
      </div>
    );
  }

  // Landing screen
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Practice</h1>
          <p className="text-gray-500">
            A quick {DAILY_ITEMS}-question mixed session to sharpen your skills
          </p>
        </div>

        {/* What's included */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Today&apos;s session includes:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">Vocabulary</p>
                <p className="text-xs text-gray-400">Flashcards & quizzes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">Grammar</p>
                <p className="text-xs text-gray-400">Multiple choice</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpenCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">Reading</p>
                <p className="text-xs text-gray-400">Short passages</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">Level: {currentLevel}</p>
                <p className="text-xs text-gray-400">~5 minutes</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStarted(true)}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Start Today&apos;s Practice
        </button>
      </div>
    );
  }

  // Completed
  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <ScoreCard
          score={score}
          total={items.length}
          onRetry={restart}
          onContinue={() => window.location.href = '/dashboard'}
        />
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">You earned {score * 10} XP from this session!</p>
        </div>
      </div>
    );
  }

  // Active practice
  const item = items[index];
  if (!item) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <ProgressBar current={index + 1} total={items.length} label="Daily Practice" />
      </div>

      {/* Item type indicator */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {item.type.startsWith('vocab') && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            <BookOpen className="w-4 h-4" /> Vocabulary
          </span>
        )}
        {item.type === 'grammar' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
            <Brain className="w-4 h-4" /> Grammar
          </span>
        )}
        {item.type === 'reading' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
            <BookOpenCheck className="w-4 h-4" /> Reading
          </span>
        )}
      </div>

      <div key={itemKey}>
        {item.type === 'vocab-flashcard' && (
          <div>
            <div className="text-center mb-2">
              <button
                onClick={() => speak(item.word.word)}
                className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                title="Listen"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <Flashcard
              front={item.word.word}
              back={item.word.meaning[uiLanguage] || item.word.meaning.en}
              pronunciation={item.word.pronunciation}
              partOfSpeech={item.word.partOfSpeech}
              example={item.word.example}
              onRate={handleFlashcardRate}
            />
          </div>
        )}

        {item.type === 'vocab-quiz' && (
          <MultipleChoice
            question={`What does "${item.word.word}" mean?`}
            options={item.options}
            correctAnswer={item.word.meaning[uiLanguage] || item.word.meaning.en}
            explanation={item.word.example ? `Example: "${item.word.example}"` : undefined}
            onAnswer={handleAnswer}
            onNext={advance}
          />
        )}

        {item.type === 'grammar' && (
          <MultipleChoice
            question={item.question}
            options={item.options}
            correctAnswer={item.correctAnswer}
            explanation={item.explanation}
            onAnswer={handleAnswer}
            onNext={advance}
          />
        )}

        {item.type === 'reading' && (
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.passage}</p>
            </div>
            <MultipleChoice
              question={item.question}
              options={item.options}
              correctAnswer={item.correctAnswer}
              explanation={item.explanation}
              onAnswer={handleAnswer}
              onNext={advance}
            />
          </div>
        )}
      </div>
    </div>
  );
}
