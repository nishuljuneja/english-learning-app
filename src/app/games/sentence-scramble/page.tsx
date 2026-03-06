'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import definitions from '@/content/word-definitions.json';
import {
  Clock, Lightbulb, Trophy, RotateCcw, CheckCircle2,
  Crown, Medal, Sparkles, ArrowLeft, ArrowRight, Shuffle, XCircle,
  Undo2, Eye, Type,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────

interface SentenceEntry {
  word: string;        // vocabulary word the sentence is about
  sentence: string;    // example sentence
  wordCount: number;
}

interface ScrambleScore {
  uid: string;
  displayName: string;
  sentencePreview: string;
  timeSeconds: number;
  adjustedTime: number;
  hintsUsed: number;
  moves: number;
  wordCount: number;
  date: string;
}

// Lazy-load Firestore
const firestoreImport = () => import('@/lib/firestore');
const gameFirestoreImport = () => import('@/lib/game-firestore');

// ─── Sentence Pool ──────────────────────────────────────────────────

const defs = definitions as Record<string, { d?: string; e?: string; p?: string }>;

const SENTENCE_POOL: SentenceEntry[] = (() => {
  const pool: SentenceEntry[] = [];
  for (const [word, info] of Object.entries(defs)) {
    if (!info.e) continue;
    const sentence = info.e.trim();
    const words = sentence.split(/\s+/);
    const wc = words.length;
    // 5-12 words, proper ending, no semicolons, reasonable length
    if (
      wc >= 5 &&
      wc <= 12 &&
      /[.!?]$/.test(sentence) &&
      !sentence.includes(';') &&
      sentence.length >= 20 &&
      sentence.length <= 150
    ) {
      pool.push({ word, sentence, wordCount: wc });
    }
  }
  return pool;
})();

// Difficulty buckets
const EASY_POOL = SENTENCE_POOL.filter((s) => s.wordCount >= 5 && s.wordCount <= 7);
const MEDIUM_POOL = SENTENCE_POOL.filter((s) => s.wordCount >= 8 && s.wordCount <= 10);
const HARD_POOL = SENTENCE_POOL.filter((s) => s.wordCount >= 10 && s.wordCount <= 12);

type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

function getPoolForDifficulty(diff: Difficulty): SentenceEntry[] {
  switch (diff) {
    case 'easy': return EASY_POOL;
    case 'medium': return MEDIUM_POOL;
    case 'hard': return HARD_POOL;
    default: return SENTENCE_POOL;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────

function getDailySentence(): SentenceEntry {
  const today = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  // Use medium pool for daily (good balance)
  const pool = MEDIUM_POOL.length > 0 ? MEDIUM_POOL : SENTENCE_POOL;
  return pool[Math.abs(hash + 3571) % pool.length];
}

function getRandomSentence(diff: Difficulty): SentenceEntry {
  const pool = getPoolForDifficulty(diff);
  return pool[Math.floor(Math.random() * pool.length)];
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

/** Ensure shuffled order is different from original */
function shuffleUntilDifferent(words: string[]): string[] {
  let shuffled = shuffle(words);
  let attempts = 0;
  while (shuffled.join(' ') === words.join(' ') && attempts < 20) {
    shuffled = shuffle(words);
    attempts++;
  }
  return shuffled;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/** Split sentence into word tokens (keeping punctuation attached) */
function tokenize(sentence: string): string[] {
  return sentence.split(/\s+/).filter((w) => w.length > 0);
}

// ─── Local Leaderboard ───────────────────────────────────────────────
const LB_KEY = 'speakeasy-scramble-lb';

interface LocalScore {
  displayName: string;
  sentencePreview: string;
  timeSeconds: number;
  adjustedTime: number;
  hintsUsed: number;
  moves: number;
  wordCount: number;
  date: string;
}

function getLocalLeaderboard(date: string): LocalScore[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LB_KEY);
    const all: LocalScore[] = raw ? JSON.parse(raw) : [];
    return all
      .filter((s) => s.date === date)
      .sort((a, b) => a.adjustedTime - b.adjustedTime || a.hintsUsed - b.hintsUsed)
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
    const trimmed = all.slice(-200);
    localStorage.setItem(LB_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

// ─── Streak tracking ────────────────────────────────────────────────
const STREAK_KEY = 'speakeasy-scramble-streak';

function getStreak(): { count: number; lastDate: string } {
  if (typeof window === 'undefined') return { count: 0, lastDate: '' };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastDate: '' };
  } catch {
    return { count: 0, lastDate: '' };
  }
}

function updateStreak(won: boolean): number {
  if (typeof window === 'undefined') return 0;
  const current = getStreak();
  const today = new Date().toISOString().split('T')[0];
  if (!won) {
    localStorage.setItem(STREAK_KEY, JSON.stringify({ count: 0, lastDate: today }));
    return 0;
  }
  const newStreak = current.lastDate === today ? current.count : current.count + 1;
  localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newStreak, lastDate: today }));
  return newStreak;
}

// ─── Hint penalty ────────────────────────────────────────────────────
const HINT_PENALTY_SECONDS = 10; // Each hint adds 10s to adjusted time

// ─── Component ───────────────────────────────────────────────────────

type GameMode = 'daily' | 'practice';
type GameState = 'idle' | 'playing' | 'won';

export default function SentenceScramblePage() {
  const { profile, setProfile } = useAppStore();

  const [mode, setMode] = useState<GameMode>('daily');
  const [state, setState] = useState<GameState>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('mixed');

  // Sentence data
  const [currentSentence, setCurrentSentence] = useState<SentenceEntry | null>(null);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [scrambledPool, setScrambledPool] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [moveCount, setMoveCount] = useState(0);

  // Feedback
  const [showCorrectFlash, setShowCorrectFlash] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);

  // Timer
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  // Hints
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedPositions, setRevealedPositions] = useState<Set<number>>(new Set());

  // Streak
  const [winStreak, setWinStreak] = useState(0);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LocalScore[]>([]);

  // Rounds (practice mode progression)
  const [roundNumber, setRoundNumber] = useState(0);

  // Load initial data
  useEffect(() => {
    const streak = getStreak();
    setWinStreak(streak.count);
    const today = new Date().toISOString().split('T')[0];
    setLeaderboard(getLocalLeaderboard(today));
  }, []);

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

  // Check win condition whenever placedWords changes
  useEffect(() => {
    if (state !== 'playing' || placedWords.length !== correctWords.length) return;
    if (placedWords.length === 0) return;

    const isCorrect = placedWords.every((w, i) => w === correctWords[i]);
    if (isCorrect) {
      handleWin();
    } else {
      // Shake feedback for wrong complete answer
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placedWords]);

  const startGame = useCallback((m: GameMode, diff?: Difficulty) => {
    const d = diff || difficulty;
    const entry = m === 'daily' ? getDailySentence() : getRandomSentence(d);
    const words = tokenize(entry.sentence);

    setMode(m);
    setCurrentSentence(entry);
    setCorrectWords(words);
    setScrambledPool(shuffleUntilDifferent(words));
    setPlacedWords([]);
    setMoveCount(0);
    setElapsed(0);
    setHintsUsed(0);
    setRevealedPositions(new Set());
    setShowCorrectFlash(false);
    setShakeWrong(false);
    setRoundNumber((prev) => prev + 1);
    setState('playing');
  }, [difficulty]);

  const handleWin = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState('won');
    setShowCorrectFlash(true);

    const newStreak = updateStreak(true);
    setWinStreak(newStreak);

    const today = new Date().toISOString().split('T')[0];
    const adjustedTime = elapsed + hintsUsed * HINT_PENALTY_SECONDS;
    const preview = currentSentence?.sentence.substring(0, 50) || '';
    const scoreData: LocalScore = {
      displayName: profile?.displayName || 'Player',
      sentencePreview: preview,
      timeSeconds: elapsed,
      adjustedTime,
      hintsUsed,
      moves: moveCount,
      wordCount: correctWords.length,
      date: today,
    };

    if (mode === 'daily') {
      saveLocalScore(scoreData);
      setLeaderboard(getLocalLeaderboard(today));

      // Save to Firestore if logged in
      if (profile) {
        const fsScore: ScrambleScore = { uid: profile.uid, ...scoreData };
        gameFirestoreImport().then((m) => m.saveScrambleScore(fsScore)).catch(() => {});
        const xpGain = Math.max(5, 25 - hintsUsed * 5);
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

      // Try Firestore leaderboard
      gameFirestoreImport()
        .then((m) => m.getScrambleLeaderboard(today))
        .then((fsLb) => {
          if (fsLb.length > 0) {
            setLeaderboard(fsLb.map((s) => ({
              displayName: s.displayName,
              sentencePreview: s.sentencePreview,
              timeSeconds: s.timeSeconds,
              adjustedTime: s.adjustedTime,
              hintsUsed: s.hintsUsed,
              moves: s.moves,
              wordCount: s.wordCount,
              date: s.date,
            })));
          }
        })
        .catch(() => {});
    } else {
      // Practice: award small XP
      if (profile) {
        const xpGain = Math.max(3, 12 - hintsUsed * 2);
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
    }
  }, [elapsed, hintsUsed, moveCount, correctWords.length, currentSentence, mode, profile, setProfile]);

  // Tap word from pool → place it
  const placeWord = useCallback((index: number) => {
    if (state !== 'playing') return;
    const word = scrambledPool[index];
    setScrambledPool((prev) => prev.filter((_, i) => i !== index));
    setPlacedWords((prev) => [...prev, word]);
    setMoveCount((prev) => prev + 1);
  }, [state, scrambledPool]);

  // Tap word from answer → return to pool
  const removeWord = useCallback((index: number) => {
    if (state !== 'playing') return;
    // Don't allow removing revealed/locked positions
    if (revealedPositions.has(index)) return;
    const word = placedWords[index];
    setPlacedWords((prev) => prev.filter((_, i) => i !== index));
    setScrambledPool((prev) => [...prev, word]);
    setMoveCount((prev) => prev + 1);
  }, [state, placedWords, revealedPositions]);

  // Clear all placed words back to pool (except revealed ones)
  const clearAll = useCallback(() => {
    if (state !== 'playing') return;
    const kept: string[] = [];
    const returned: string[] = [];
    placedWords.forEach((w, i) => {
      if (revealedPositions.has(i)) {
        kept.push(w);
      } else {
        returned.push(w);
      }
    });
    setPlacedWords(kept);
    setScrambledPool((prev) => [...prev, ...returned]);
    setMoveCount((prev) => prev + 1);
  }, [state, placedWords, revealedPositions]);

  // Hint logic
  const useHint = useCallback(() => {
    if (!currentSentence || hintsUsed >= 3 || state !== 'playing') return;
    const nextHint = hintsUsed + 1;

    if (nextHint === 1) {
      // Hint 1: Reveal the first word — place it correctly if not already placed
      const firstWord = correctWords[0];
      if (placedWords.length === 0 || placedWords[0] !== firstWord) {
        // Remove first word from pool if it's there
        const poolIdx = scrambledPool.indexOf(firstWord);
        if (poolIdx !== -1) {
          // Also return any misplaced word at position 0
          const newPlaced = [...placedWords];
          const newPool = scrambledPool.filter((_, i) => i !== poolIdx);
          if (newPlaced.length > 0 && newPlaced[0] !== firstWord) {
            newPool.push(newPlaced[0]);
            newPlaced[0] = firstWord;
          } else if (newPlaced.length === 0) {
            newPlaced.push(firstWord);
          }
          setPlacedWords(newPlaced);
          setScrambledPool(newPool);
        }
      }
      setRevealedPositions((prev) => new Set(prev).add(0));
    } else if (nextHint === 2) {
      // Hint 2: Show the keyword (the vocab word this sentence is about)
      // This is visual — handled in render
    } else if (nextHint === 3) {
      // Hint 3: Fix the next wrong positioned word
      // Find first incorrect position (after revealed ones)
      for (let i = 0; i < correctWords.length; i++) {
        if (revealedPositions.has(i)) continue;
        if (i >= placedWords.length || placedWords[i] !== correctWords[i]) {
          const correctWord = correctWords[i];
          // Find it in pool or placed (wrong position)
          const newPlaced = [...placedWords];
          const newPool = [...scrambledPool];

          // Check if it's in the pool
          const poolIdx = newPool.indexOf(correctWord);
          if (poolIdx !== -1) {
            newPool.splice(poolIdx, 1);
          } else {
            // It's placed somewhere else — find and remove it
            const placedIdx = newPlaced.indexOf(correctWord);
            if (placedIdx !== -1 && placedIdx !== i) {
              newPlaced.splice(placedIdx, 1);
            }
          }

          // If there's a wrong word at position i, return it to pool
          if (i < newPlaced.length) {
            newPool.push(newPlaced[i]);
            newPlaced[i] = correctWord;
          } else {
            // Pad with correct word at the right position
            while (newPlaced.length < i) {
              // This shouldn't normally happen but handle edge case
              break;
            }
            newPlaced.splice(i, 0, correctWord);
          }

          setPlacedWords(newPlaced);
          setScrambledPool(newPool);
          setRevealedPositions((prev) => new Set(prev).add(i));
          break;
        }
      }
    }

    setHintsUsed(nextHint);
  }, [currentSentence, hintsUsed, state, correctWords, placedWords, scrambledPool, revealedPositions]);

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

  const getDifficultyLabel = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return '5-7 words';
      case 'medium': return '8-10 words';
      case 'hard': return '10-12 words';
      default: return 'All lengths';
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  // Check partial correctness for visual feedback
  const getWordStatus = (index: number): 'correct' | 'wrong' | 'neutral' => {
    if (index >= placedWords.length) return 'neutral';
    if (revealedPositions.has(index)) return 'correct';
    // Only show status if all words are placed
    if (placedWords.length === correctWords.length) {
      return placedWords[index] === correctWords[index] ? 'correct' : 'wrong';
    }
    return 'neutral';
  };

  // ─── IDLE STATE ────────────────────────────────────────────────────
  if (state === 'idle') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> All Games
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shuffle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Scramble</h1>
          <p className="text-gray-500">
            Unscramble the words to build the correct sentence!
          </p>
          {winStreak > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium">
              🔥 {winStreak} win streak
            </div>
          )}
        </div>

        {/* Rules */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">How to play</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">1.</span>
              Words from a sentence are shuffled randomly.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">2.</span>
              Tap words from the word bank to place them in order.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">3.</span>
              Tap a placed word to send it back to the word bank.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">4.</span>
              Use hints if you&apos;re stuck (each hint adds +{HINT_PENALTY_SECONDS}s penalty).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">5.</span>
              <strong>Daily:</strong> Same sentence for everyone. Fastest time wins!
            </li>
          </ul>
        </div>

        {/* Mode selection */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => startGame('daily')}
            className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl p-6 text-left hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
          >
            <Sparkles className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Daily Challenge</h3>
            <p className="text-white/70 text-sm">Same sentence for everyone. Compete for the best time!</p>
          </button>
          <button
            onClick={() => startGame('practice')}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-left hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
          >
            <RotateCcw className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Practice</h3>
            <p className="text-white/70 text-sm">Random sentence each time. Pick your difficulty!</p>
          </button>
        </div>

        {/* Difficulty selector (practice only preview) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Practice Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {(['mixed', 'easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  difficulty === d
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
                <span className="ml-1 text-xs opacity-70">({getDifficultyLabel(d)})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard preview */}
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
                  <span className="text-sm font-mono text-gray-500">{formatTime(entry.adjustedTime)}</span>
                  {entry.hintsUsed > 0 && (
                    <span className="text-xs text-amber-500">{entry.hintsUsed}h</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {SENTENCE_POOL.length} sentences available
          {' · '}
          {EASY_POOL.length} easy · {MEDIUM_POOL.length} medium · {HARD_POOL.length} hard
        </div>
      </div>
    );
  }

  // ─── WON STATE ─────────────────────────────────────────────────────
  if (state === 'won' && currentSentence) {
    const adjustedTime = elapsed + hintsUsed * HINT_PENALTY_SECONDS;
    const def = defs[currentSentence.word];

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Perfect!</h1>
          <p className="text-gray-500">You unscrambled the sentence correctly!</p>
        </div>

        {/* The sentence */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 mb-6 border border-cyan-100">
          <p className="text-lg font-medium text-gray-800 text-center leading-relaxed">
            &ldquo;{currentSentence.sentence}&rdquo;
          </p>
          <div className="mt-3 text-center">
            <span className="text-sm text-cyan-700 font-medium">
              Keyword: <span className="font-bold">{currentSentence.word}</span>
            </span>
            {def?.d && (
              <p className="text-xs text-gray-500 mt-1 italic">
                ({def.p}) {def.d}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(elapsed)}</div>
            <div className="text-xs text-gray-400">Time</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Clock className="w-6 h-6 text-cyan-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(adjustedTime)}</div>
            <div className="text-xs text-gray-400">Adjusted Time</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Lightbulb className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{hintsUsed}</div>
            <div className="text-xs text-gray-400">Hints Used</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <span className="block text-2xl mx-auto mb-1">🔥</span>
            <div className="text-2xl font-bold text-gray-800">{winStreak}</div>
            <div className="text-xs text-gray-400">Win Streak</div>
          </div>
        </div>

        {/* Leaderboard — daily mode only */}
        {mode === 'daily' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-700">Today&apos;s Leaderboard</h3>
            </div>
            {leaderboard.length > 0 ? (
              <div className="space-y-2">
                {leaderboard.map((entry, i) => {
                  const isCurrentUser = entry.displayName === (profile?.displayName || 'Player');
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl ${
                        isCurrentUser ? 'bg-cyan-50 ring-1 ring-cyan-200' : ''
                      }`}
                    >
                      {getRankIcon(i)}
                      <span className="flex-1 font-medium text-gray-700 truncate">
                        {entry.displayName}
                        {isCurrentUser && (
                          <span className="text-cyan-600 text-xs ml-1">(You)</span>
                        )}
                      </span>
                      <span className="text-sm font-mono text-gray-600">{formatTime(entry.adjustedTime)}</span>
                      {entry.hintsUsed > 0 && (
                        <span className="text-xs text-amber-500">{entry.hintsUsed}h</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-400">You&apos;re the first to complete today&apos;s puzzle!</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => startGame(mode)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            {mode === 'daily' ? 'Play Again' : 'Next Sentence'}
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
  if (!currentSentence) return null;

  const adjustedTimePreview = elapsed + hintsUsed * HINT_PENALTY_SECONDS;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shuffle className="w-5 h-5 text-cyan-600" />
          <span className="text-sm font-medium text-gray-600">
            {mode === 'daily' ? 'Daily Challenge' : 'Practice'}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(
            currentSentence.wordCount <= 7 ? 'easy' : currentSentence.wordCount <= 9 ? 'medium' : 'hard'
          )}`}>
            {currentSentence.wordCount} words
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-mono text-lg font-bold text-gray-800">{formatTime(elapsed)}</span>
          </div>
        </div>
      </div>

      {/* Keyword hint (shown after hint 2) */}
      {hintsUsed >= 2 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 mb-4 text-center">
          <span className="text-sm text-amber-700">
            <Eye className="w-4 h-4 inline mr-1 -mt-0.5" />
            Keyword: <strong>{currentSentence.word}</strong>
            {defs[currentSentence.word]?.p && (
              <span className="text-amber-500 ml-1">({defs[currentSentence.word].p})</span>
            )}
          </span>
        </div>
      )}

      {/* Answer area — placed words */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 min-h-[100px]">
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-500">Your sentence</h3>
          {placedWords.length > 0 && (
            <button
              onClick={clearAll}
              className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition"
            >
              <Undo2 className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
        <div
          className={`flex flex-wrap gap-2 min-h-[48px] items-start ${
            shakeWrong ? 'animate-[shake_0.5s_ease-in-out]' : ''
          }`}
        >
          {placedWords.length === 0 ? (
            <p className="text-gray-300 text-sm italic">Tap words below to build the sentence...</p>
          ) : (
            placedWords.map((word, i) => {
              const status = getWordStatus(i);
              const isRevealed = revealedPositions.has(i);
              return (
                <button
                  key={`placed-${roundNumber}-${i}-${word}`}
                  onClick={() => removeWord(i)}
                  disabled={isRevealed}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isRevealed
                      ? 'bg-green-100 text-green-700 border-2 border-green-300 cursor-not-allowed'
                      : status === 'correct'
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : status === 'wrong'
                      ? 'bg-red-100 text-red-700 border-2 border-red-300'
                      : 'bg-cyan-100 text-cyan-800 border-2 border-cyan-200 hover:bg-cyan-200 hover:border-cyan-300 active:scale-95 cursor-pointer'
                  }`}
                >
                  {word}
                  {isRevealed && <span className="ml-1 text-green-500">🔒</span>}
                </button>
              );
            })
          )}
          {/* Empty slots to show expected length */}
          {placedWords.length < correctWords.length &&
            Array.from({ length: correctWords.length - placedWords.length }).map((_, i) => (
              <div
                key={`slot-${i}`}
                className="px-3 py-2 rounded-xl border-2 border-dashed border-gray-200 text-transparent text-sm select-none"
              >
                {'word'}
              </div>
            ))}
        </div>
        {/* Progress indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(placedWords.length / correctWords.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400">
            {placedWords.length}/{correctWords.length}
          </span>
        </div>
      </div>

      {/* Word bank — scrambled words */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Shuffle className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-500">Word Bank</h3>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[48px]">
          {scrambledPool.length === 0 ? (
            <p className="text-gray-300 text-sm italic">All words placed!</p>
          ) : (
            scrambledPool.map((word, i) => (
              <button
                key={`pool-${roundNumber}-${i}-${word}`}
                onClick={() => placeWord(i)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium border-2 border-gray-200 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-700 active:scale-95 transition-all cursor-pointer"
              >
                {word}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Hints */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-gray-700">Hints</h3>
            <span className="text-xs text-gray-400">(+{HINT_PENALTY_SECONDS}s each)</span>
          </div>
          <button
            onClick={useHint}
            disabled={hintsUsed >= 3}
            className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
          >
            {hintsUsed >= 3 ? 'No more hints' : `Hint ${hintsUsed + 1}/3`}
          </button>
        </div>
        <div className="text-xs text-gray-400 space-y-1">
          <p className={hintsUsed >= 1 ? 'text-green-600 font-medium' : ''}>
            {hintsUsed >= 1 ? '✓ First word revealed' : '1. Reveal the first word'}
          </p>
          <p className={hintsUsed >= 2 ? 'text-green-600 font-medium' : ''}>
            {hintsUsed >= 2 ? `✓ Keyword: ${currentSentence.word}` : '2. Show the keyword'}
          </p>
          <p className={hintsUsed >= 3 ? 'text-green-600 font-medium' : ''}>
            {hintsUsed >= 3 ? '✓ Next word fixed' : '3. Fix the next wrong word'}
          </p>
        </div>
      </div>

      {/* Moves & adjusted time info */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-4">
        <span>{moveCount} moves</span>
        {hintsUsed > 0 && (
          <span>Adjusted: {formatTime(adjustedTimePreview)}</span>
        )}
      </div>

      {/* Streak display */}
      {winStreak > 0 && (
        <div className="text-center mb-4">
          <span className="text-sm text-amber-600 font-medium">🔥 {winStreak} win streak</span>
        </div>
      )}

      {/* Give up */}
      <div className="text-center">
        <button
          onClick={() => {
            if (timerRef.current) clearInterval(timerRef.current);
            // Place all words correctly to show the answer
            setPlacedWords([...correctWords]);
            setScrambledPool([]);
            updateStreak(false);
            setWinStreak(0);
            // Don't set state to 'won' — just show the answer with a different message
            setState('won');
          }}
          className="text-sm text-gray-400 hover:text-red-500 transition"
        >
          Give up &amp; reveal sentence
        </button>
      </div>

      {/* Shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
