'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { allVocabulary } from '@/content/vocabulary';
import gameDictionary from '@/content/game-dictionary.json';
import {
  LetterText, Clock, Lightbulb, Trophy, ArrowRight, RotateCcw,
  Shuffle, CheckCircle2, XCircle, Crown, Medal, Sparkles, ArrowLeft,
} from 'lucide-react';

// Inline types to avoid importing from firestore modules (Turbopack issue)
interface VocabularyWord {
  id: string;
  word: string;
  meaning: Record<string, string>;
  partOfSpeech: string;
  level: string;
  example: string;
  exampleTranslation: Record<string, string>;
  pronunciation: string;
  audioUrl?: string;
  imageUrl?: string;
  tags: string[];
  oxfordList: 'A' | 'B';
}

interface GameScore {
  uid: string;
  displayName: string;
  targetWord: string;
  timeSeconds: number;
  adjustedTime: number;
  hintsUsed: number;
  wordsFound: number;
  date: string;
}

// Lazy-load Firestore functions at runtime only
const firestoreImport = () => import('@/lib/firestore');
const gameFirestoreImport = () => import('@/lib/game-firestore');

// ─────────────────────────────────────────────────────────────────────
// Dictionary: 75K+ English words (3–7 letters) from comprehensive word list
// ─────────────────────────────────────────────────────────────────────
const DICTIONARY = new Set<string>(gameDictionary as string[]);

// Also add any Oxford vocabulary words that might have been missed
for (const w of allVocabulary) {
  const clean = w.word.toLowerCase().trim();
  if (clean.length >= 3 && clean.length <= 7 && /^[a-z]+$/.test(clean)) {
    DICTIONARY.add(clean);
  }
}

// All 7-letter words from Oxford vocab (alphabetic only)
const SEVEN_LETTER_WORDS = allVocabulary.filter(
  (w) => w.word.length === 7 && /^[a-z]+$/i.test(w.word)
);

// ─── Helpers ─────────────────────────────────────────────────────────

/** Daily word (deterministic by date) */
function getDailyWord(): VocabularyWord {
  const today = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return SEVEN_LETTER_WORDS[Math.abs(hash) % SEVEN_LETTER_WORDS.length];
}

/** Random word for practice mode */
function getRandomWord(): VocabularyWord {
  return SEVEN_LETTER_WORDS[Math.floor(Math.random() * SEVEN_LETTER_WORDS.length)];
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Can the word be formed from the given letters? */
function canForm(word: string, letters: string[]): boolean {
  const avail = letters.map((l) => l.toLowerCase());
  for (const ch of word.toLowerCase()) {
    const idx = avail.indexOf(ch);
    if (idx === -1) return false;
    avail.splice(idx, 1);
  }
  return true;
}

/** Find all valid words from dictionary that can be formed from letters */
function findAllValidWords(letters: string[]): string[] {
  const lowerLetters = letters.map((l) => l.toLowerCase());
  const valid: string[] = [];
  for (const word of DICTIONARY) {
    if (word.length >= 3 && word.length <= 7 && canForm(word, lowerLetters)) {
      valid.push(word);
    }
  }
  return valid.sort((a, b) => a.length - b.length || a.localeCompare(b));
}

/** Format seconds as MM:SS */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ─── Local leaderboard storage ───────────────────────────────────────
const LB_KEY = 'speakeasy-word-puzzle-lb';

interface LocalScore {
  displayName: string;
  targetWord: string;
  timeSeconds: number;
  adjustedTime: number;
  hintsUsed: number;
  wordsFound: number;
  date: string;
}

function getLocalLeaderboard(targetWord: string): LocalScore[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LB_KEY);
    const all: LocalScore[] = raw ? JSON.parse(raw) : [];
    return all
      .filter((s) => s.targetWord === targetWord)
      .sort((a, b) => a.adjustedTime - b.adjustedTime)
      .slice(0, 20);
  } catch {
    return [];
  }
}

function saveLocalScore(score: LocalScore) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(LB_KEY);
    const all: LocalScore[] = raw ? JSON.parse(raw) : [];
    all.push(score);
    // Keep last 200 entries
    const trimmed = all.slice(-200);
    localStorage.setItem(LB_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

// ─── Hint penalty (seconds) ──────────────────────────────────────────
const HINT_PENALTY = 15;

// ─── Component ───────────────────────────────────────────────────────

type GameMode = 'daily' | 'practice';
type GameState = 'idle' | 'playing' | 'won';

export default function WordPuzzlePage() {
  const { profile, setProfile, uiLanguage } = useAppStore();

  // Mode & state
  const [mode, setMode] = useState<GameMode>('daily');
  const [state, setState] = useState<GameState>('idle');

  // Game data
  const [targetWordObj, setTargetWordObj] = useState<VocabularyWord | null>(null);
  const [letters, setLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [allValid, setAllValid] = useState<string[]>([]);

  // Timer
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  // Input
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'duplicate'; msg: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hints
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedHints, setRevealedHints] = useState<string[]>([]);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LocalScore[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Clear feedback after 2s
  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 2000);
    return () => clearTimeout(t);
  }, [feedback]);

  // Timer tick
  useEffect(() => {
    if (state === 'playing') {
      startTimeRef.current = Date.now() - elapsed * 1000;
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 250);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Start a new game
  const startGame = useCallback(
    (m: GameMode) => {
      const word = m === 'daily' ? getDailyWord() : getRandomWord();
      const lettersArr = shuffle(word.word.toUpperCase().split(''));
      const valid = findAllValidWords(lettersArr);

      setMode(m);
      setTargetWordObj(word);
      setLetters(lettersArr);
      setAllValid(valid);
      setFoundWords([]);
      setElapsed(0);
      setInput('');
      setFeedback(null);
      setHintsUsed(0);
      setRevealedHints([]);
      setState('playing');
      setShowLeaderboard(false);

      setTimeout(() => inputRef.current?.focus(), 100);
    },
    []
  );

  // Shuffle the letter tiles (visual only)
  const reshuffleLetters = useCallback(() => {
    setLetters((prev) => shuffle(prev));
  }, []);

  // Submit a word
  const submitWord = useCallback(() => {
    if (!targetWordObj || state !== 'playing') return;
    const word = input.trim().toLowerCase();
    setInput('');

    if (word.length < 3) {
      setFeedback({ type: 'error', msg: 'Word must be at least 3 letters' });
      return;
    }

    if (!canForm(word, letters)) {
      setFeedback({ type: 'error', msg: 'Can\'t make that from these letters' });
      return;
    }

    if (foundWords.includes(word)) {
      setFeedback({ type: 'duplicate', msg: 'Already found!' });
      return;
    }

    if (!DICTIONARY.has(word)) {
      setFeedback({ type: 'error', msg: 'Not in dictionary' });
      return;
    }

    // Valid word!
    const newFound = [...foundWords, word];
    setFoundWords(newFound);
    setFeedback({ type: 'success', msg: word.length === 7 ? '🎉 You found it!' : `+${word.length} pts` });

    // Check if they found the 7-letter word
    if (word === targetWordObj.word.toLowerCase()) {
      // GAME WON!
      if (timerRef.current) clearInterval(timerRef.current);
      setState('won');

      const timeSeconds = elapsed;
      const adjustedTime = timeSeconds + hintsUsed * HINT_PENALTY;

      // Save score
      const scoreData: LocalScore = {
        displayName: profile?.displayName || 'Player',
        targetWord: targetWordObj.word.toLowerCase(),
        timeSeconds,
        adjustedTime,
        hintsUsed,
        wordsFound: newFound.length,
        date: new Date().toISOString().split('T')[0],
      };

      saveLocalScore(scoreData);
      setLeaderboard(getLocalLeaderboard(targetWordObj.word.toLowerCase()));
      setShowLeaderboard(true);

      // Save to Firestore (if logged in)
      if (profile) {
        const fsScore: GameScore = {
          uid: profile.uid,
          ...scoreData,
        };
        gameFirestoreImport().then((m) => m.saveGameScore(fsScore)).catch(() => {});
        // Award XP
        const xpGain = Math.max(10, 50 - Math.floor(adjustedTime / 10));
        firestoreImport().then((m) => m.addXP(profile.uid, xpGain)).catch(() => {});
        firestoreImport().then((m) => m.updateStreak(profile.uid))
          .then((streakData) => {
            setProfile({
              ...profile,
              xp: profile.xp + xpGain,
              streak: streakData.streak,
              lastActiveDate: streakData.lastActiveDate,
            });
          })
          .catch(() => {
            setProfile({ ...profile, xp: profile.xp + xpGain });
          });
      }

      // Also try loading Firestore leaderboard
      gameFirestoreImport().then((m) => m.getGameLeaderboard(targetWordObj.word.toLowerCase()))
        .then((fsLb) => {
          if (fsLb.length > 0) {
            setLeaderboard(
              fsLb.map((s) => ({
                displayName: s.displayName,
                targetWord: s.targetWord,
                timeSeconds: s.timeSeconds,
                adjustedTime: s.adjustedTime,
                hintsUsed: s.hintsUsed,
                wordsFound: s.wordsFound,
                date: s.date,
              }))
            );
          }
        })
        .catch(() => {});
    }

    inputRef.current?.focus();
  }, [input, letters, foundWords, targetWordObj, state, elapsed, hintsUsed, profile, setProfile]);

  // Use a hint
  const useHint = useCallback(() => {
    if (!targetWordObj || hintsUsed >= 3) return;
    const word = targetWordObj;
    const nextHint = hintsUsed + 1;

    let hintText = '';
    if (nextHint === 1) {
      hintText = `The 7-letter word is a ${word.partOfSpeech || 'word'}`;
    } else if (nextHint === 2) {
      hintText = `It starts with "${word.word.slice(0, 2).toUpperCase()}"`;
    } else if (nextHint === 3) {
      const def = word.meaning?.en || word.word;
      hintText = `Definition: ${def}`;
    }

    setHintsUsed(nextHint);
    setRevealedHints((prev) => [...prev, hintText]);
  }, [targetWordObj, hintsUsed]);

  // Load leaderboard for daily word on initial render
  useEffect(() => {
    const daily = getDailyWord();
    const lb = getLocalLeaderboard(daily.word.toLowerCase());
    setLeaderboard(lb);
    // Try Firestore too
    gameFirestoreImport().then((m) => m.getGameLeaderboard(daily.word.toLowerCase()))
      .then((fsLb) => {
        if (fsLb.length > 0) {
          setLeaderboard(
            fsLb.map((s) => ({
              displayName: s.displayName,
              targetWord: s.targetWord,
              timeSeconds: s.timeSeconds,
              adjustedTime: s.adjustedTime,
              hintsUsed: s.hintsUsed,
              wordsFound: s.wordsFound,
              date: s.date,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-amber-600" />;
    return (
      <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-400">
        {index + 1}
      </span>
    );
  };

  // ─── IDLE STATE ────────────────────────────────────────────────────
  if (state === 'idle') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> All Games
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LetterText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Un-Jumble</h1>
          <p className="text-gray-500">
            You get 7 letters. Find as many words as you can, then discover the 7-letter word!
          </p>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">How to play</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">1.</span>
              You&apos;ll see 7 scrambled letters. Type words (3+ letters) you can make from them.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">2.</span>
              Keep finding words until you discover the 7-letter word.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">3.</span>
              Timer runs until you find it. Use hints if stuck (+{HINT_PENALTY}s penalty each).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold">4.</span>
              Your time (+ penalties) goes on the leaderboard. Faster = better!
            </li>
          </ul>
        </div>

        {/* Mode selection */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => startGame('daily')}
            className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-2xl p-6 text-left hover:from-violet-600 hover:to-indigo-700 transition-all shadow-lg"
          >
            <Sparkles className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Daily Challenge</h3>
            <p className="text-white/70 text-sm">Same puzzle for everyone today. Compete on the leaderboard!</p>
          </button>
          <button
            onClick={() => startGame('practice')}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-left hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
          >
            <RotateCcw className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Practice</h3>
            <p className="text-white/70 text-sm">Random puzzle each time. Practice at your own pace.</p>
          </button>
        </div>

        {/* Today's Leaderboard Preview */}
        {leaderboard.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="font-semibold text-gray-700">Today&apos;s Leaderboard</h2>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((entry, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  {getRankIcon(i)}
                  <span className="flex-1 font-medium text-gray-700 truncate">{entry.displayName}</span>
                  <span className="text-sm text-gray-500">{formatTime(entry.adjustedTime)}</span>
                  <span className="text-xs text-gray-400">{entry.wordsFound} words</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── WON STATE ─────────────────────────────────────────────────────
  if (state === 'won' && targetWordObj) {
    const adjustedTime = elapsed + hintsUsed * HINT_PENALTY;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Puzzle Complete!</h1>
          <p className="text-gray-500">
            The word was <span className="font-bold text-indigo-600 text-lg">{targetWordObj.word.toUpperCase()}</span>
          </p>
          {targetWordObj.meaning?.en && (
            <p className="text-sm text-gray-400 mt-1 italic">
              ({targetWordObj.partOfSpeech}) {targetWordObj.meaning.en}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(elapsed)}</div>
            <div className="text-xs text-gray-400">Time</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Clock className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(adjustedTime)}</div>
            <div className="text-xs text-gray-400">Adjusted</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{foundWords.length}</div>
            <div className="text-xs text-gray-400">Words Found</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Lightbulb className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{hintsUsed}</div>
            <div className="text-xs text-gray-400">Hints Used</div>
          </div>
        </div>

        {/* Words found */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Your Words ({foundWords.length}/{allValid.length} possible)</h3>
          <div className="flex flex-wrap gap-2">
            {foundWords.map((w) => (
              <span
                key={w}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  w.length === 7
                    ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          {/* Show words they missed */}
          {allValid.length > foundWords.length && (
            <details className="mt-4">
              <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                Show {allValid.length - foundWords.length} missed words
              </summary>
              <div className="flex flex-wrap gap-2 mt-2">
                {allValid
                  .filter((w) => !foundWords.includes(w))
                  .map((w) => (
                    <span key={w} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-500">
                      {w}
                    </span>
                  ))}
              </div>
            </details>
          )}
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold text-gray-700">
              Leaderboard — &ldquo;{targetWordObj.word.toUpperCase()}&rdquo;
            </h3>
          </div>
          {leaderboard.length > 0 ? (
            <div className="space-y-2">
              {leaderboard.map((entry, i) => {
                const isCurrentUser = entry.displayName === (profile?.displayName || 'Player');
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-xl ${
                      isCurrentUser ? 'bg-indigo-50 ring-1 ring-indigo-200' : ''
                    }`}
                  >
                    {getRankIcon(i)}
                    <span className="flex-1 font-medium text-gray-700 truncate">
                      {entry.displayName}
                      {isCurrentUser && (
                        <span className="text-indigo-500 text-xs ml-1">(You)</span>
                      )}
                    </span>
                    <span className="text-sm font-mono text-gray-600">{formatTime(entry.adjustedTime)}</span>
                    <span className="text-xs text-gray-400">{entry.wordsFound}w</span>
                    {entry.hintsUsed > 0 && (
                      <span className="text-xs text-amber-500">{entry.hintsUsed}h</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">You&apos;re the first to complete this puzzle!</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => startGame(mode)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            {mode === 'daily' ? 'Play Again' : 'New Puzzle'}
          </button>
          <Link
            href="/games"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Games
          </Link>
        </div>
      </div>
    );
  }

  // ─── PLAYING STATE ─────────────────────────────────────────────────
  if (!targetWordObj) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <LetterText className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium text-gray-600">
            {mode === 'daily' ? 'Daily Challenge' : 'Practice'}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-mono text-lg font-bold text-gray-800">{formatTime(elapsed)}</span>
        </div>
      </div>

      {/* Letter tiles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          {letters.map((letter, i) => (
            <button
              key={`${i}-${letter}`}
              onClick={() => {
                setInput((prev) => prev + letter.toLowerCase());
                inputRef.current?.focus();
              }}
              className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-amber-900 shadow-sm hover:shadow-md hover:border-indigo-400 hover:from-indigo-50 hover:to-indigo-100 hover:text-indigo-800 transition-all cursor-pointer active:scale-95"
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={reshuffleLetters}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition"
          >
            <Shuffle className="w-4 h-4" /> Shuffle
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z]/g, ''))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) submitWord();
            if (e.key === 'Backspace' && input === '') return;
          }}
          placeholder="Type a word..."
          className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-lg font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          onClick={submitWord}
          disabled={!input.trim()}
          className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => setInput('')}
          className="px-3 py-3 text-gray-400 hover:text-red-500 rounded-xl transition"
          title="Clear"
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`text-sm font-medium px-4 py-2 rounded-xl mb-4 text-center transition-all ${
            feedback.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : feedback.type === 'duplicate'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {/* Found words */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">
            Found: {foundWords.length} word{foundWords.length !== 1 ? 's' : ''}
          </h3>
          <span className="text-xs text-gray-400">
            {allValid.length} possible
          </span>
        </div>
        {foundWords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {foundWords.map((w) => (
              <span
                key={w}
                className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
              >
                {w} <span className="text-green-500 text-xs">+{w.length}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No words found yet. Start typing!</p>
        )}
      </div>

      {/* Hint section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-gray-700">Hints</h3>
          </div>
          <button
            onClick={useHint}
            disabled={hintsUsed >= 3}
            className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
          >
            {hintsUsed >= 3
              ? 'No more hints'
              : `Get Hint (${hintsUsed}/3) +${HINT_PENALTY}s`}
          </button>
        </div>
        {revealedHints.length > 0 ? (
          <div className="space-y-2">
            {revealedHints.map((hint, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-amber-500 font-bold">{i + 1}.</span>
                <span className="text-gray-600">{hint}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">
            Hints add {HINT_PENALTY} seconds to your time. Use wisely!
          </p>
        )}
      </div>

      {/* Give up */}
      <div className="text-center">
        <button
          onClick={() => {
            if (timerRef.current) clearInterval(timerRef.current);
            setState('idle');
          }}
          className="text-sm text-gray-400 hover:text-red-500 transition"
        >
          Give up & return
        </button>
      </div>
    </div>
  );
}
