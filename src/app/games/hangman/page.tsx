'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { allVocabulary } from '@/content/vocabulary';
import definitions from '@/content/word-definitions.json';
import {
  Clock, Lightbulb, Trophy, RotateCcw, CheckCircle2,
  Crown, Medal, Sparkles, ArrowLeft, Heart, Skull,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────

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

interface HangmanScore {
  uid: string;
  displayName: string;
  word: string;
  won: boolean;
  wrongGuesses: number;
  hintsUsed: number;
  timeSeconds: number;
  streak: number;
  date: string;
}

// Lazy-load Firestore
const firestoreImport = () => import('@/lib/firestore');
const gameFirestoreImport = () => import('@/lib/game-firestore');

// ─── Word Pool ───────────────────────────────────────────────────────
// Use only 7-letter words, alphabetic only, that have definitions
const defs = definitions as Record<string, { d?: string; e?: string; p?: string }>;
const WORD_POOL = allVocabulary.filter(
  (w) =>
    w.word.length === 7 &&
    /^[a-z]+$/i.test(w.word) &&
    defs[w.word.toLowerCase()]?.d
);

const MAX_WRONG = 8; // head, body, left arm, right arm, left hand, right hand, left leg, right leg

// ─── Helpers ─────────────────────────────────────────────────────────

function getDailyWord(): VocabularyWord {
  const today = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  // Use a different offset to avoid same word as word-puzzle
  return WORD_POOL[Math.abs(hash + 7919) % WORD_POOL.length];
}

function getRandomWord(): VocabularyWord {
  return WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ─── Hangman Drawing (SVG) ───────────────────────────────────────────

function HangmanDrawing({ wrongCount }: { wrongCount: number }) {
  return (
    <svg viewBox="0 0 200 220" className="w-48 h-48 sm:w-56 sm:h-56 mx-auto">
      {/* Gallows */}
      <line x1="20" y1="210" x2="180" y2="210" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
      <line x1="60" y1="210" x2="60" y2="20" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
      <line x1="60" y1="20" x2="130" y2="20" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
      <line x1="130" y1="20" x2="130" y2="50" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />

      {/* Head */}
      {wrongCount >= 1 && (
        <circle cx="130" cy="70" r="20" stroke="#EF4444" strokeWidth="3" fill="none" className="animate-[fadeIn_0.3s_ease]" />
      )}
      {/* Body */}
      {wrongCount >= 2 && (
        <line x1="130" y1="90" x2="130" y2="145" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="animate-[fadeIn_0.3s_ease]" />
      )}
      {/* Left arm */}
      {wrongCount >= 3 && (
        <line x1="130" y1="105" x2="100" y2="130" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="animate-[fadeIn_0.3s_ease]" />
      )}
      {/* Right arm */}
      {wrongCount >= 4 && (
        <line x1="130" y1="105" x2="160" y2="130" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="animate-[fadeIn_0.3s_ease]" />
      )}

      {/* Left hand */}
      {wrongCount >= 5 && (
        <circle cx="95" cy="134" r="4" stroke="#EF4444" strokeWidth="2" fill="#EF4444" className="animate-[fadeIn_0.3s_ease]" />
      )}
      {/* Right hand */}
      {wrongCount >= 6 && (
        <circle cx="165" cy="134" r="4" stroke="#EF4444" strokeWidth="2" fill="#EF4444" className="animate-[fadeIn_0.3s_ease]" />
      )}
      {/* Left leg */}
      {wrongCount >= 7 && (
        <line x1="130" y1="145" x2="105" y2="180" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="animate-[fadeIn_0.3s_ease]" />
      )}
      {/* Right leg */}
      {wrongCount >= 8 && (
        <line x1="130" y1="145" x2="155" y2="180" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" className="animate-[fadeIn_0.3s_ease]" />
      )}
    </svg>
  );
}

// ─── Local Leaderboard ───────────────────────────────────────────────
const LB_KEY = 'speakeasy-hangman-lb';

interface LocalScore {
  displayName: string;
  word: string;
  won: boolean;
  wrongGuesses: number;
  hintsUsed: number;
  timeSeconds: number;
  streak: number;
  date: string;
}

function getLocalLeaderboard(date: string): LocalScore[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LB_KEY);
    const all: LocalScore[] = raw ? JSON.parse(raw) : [];
    return all
      .filter((s) => s.date === date && s.won)
      .sort((a, b) => a.wrongGuesses - b.wrongGuesses || a.timeSeconds - b.timeSeconds)
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
const STREAK_KEY = 'speakeasy-hangman-streak';

function getStreak(): { count: number; lastWord: string } {
  if (typeof window === 'undefined') return { count: 0, lastWord: '' };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastWord: '' };
  } catch {
    return { count: 0, lastWord: '' };
  }
}

function updateStreak(won: boolean, word: string): number {
  if (typeof window === 'undefined') return 0;
  const current = getStreak();
  const newStreak = won ? current.count + 1 : 0;
  localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newStreak, lastWord: word }));
  return newStreak;
}

// ─── Hint penalty ────────────────────────────────────────────────────
const HINT_PENALTY = 1; // Each hint = +1 wrong guess equivalent for leaderboard

// ─── Component ───────────────────────────────────────────────────────

type GameMode = 'daily' | 'practice';
type GameState = 'idle' | 'playing' | 'won' | 'lost';

const KEYBOARD_ROWS = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  'ZXCVBNM'.split(''),
];

export default function HangmanPage() {
  const { profile, setProfile } = useAppStore();

  const [mode, setMode] = useState<GameMode>('daily');
  const [state, setState] = useState<GameState>('idle');

  // Game data
  const [targetWord, setTargetWord] = useState<VocabularyWord | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);

  // Timer
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  // Hints
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedHints, setRevealedHints] = useState<string[]>([]);

  // Streak
  const [winStreak, setWinStreak] = useState(0);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LocalScore[]>([]);

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

  // Keyboard handler
  useEffect(() => {
    if (state !== 'playing') return;
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key) && !guessedLetters.has(key)) {
        handleGuess(key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, guessedLetters, targetWord, wrongGuesses]);

  const startGame = useCallback((m: GameMode) => {
    const word = m === 'daily' ? getDailyWord() : getRandomWord();
    setMode(m);
    setTargetWord(word);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setElapsed(0);
    setHintsUsed(0);
    setRevealedHints([]);
    setState('playing');
  }, []);

  const handleGuess = useCallback((letter: string) => {
    if (!targetWord || state !== 'playing') return;
    const upper = letter.toUpperCase();
    if (guessedLetters.has(upper)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(upper);
    setGuessedLetters(newGuessed);

    const wordUpper = targetWord.word.toUpperCase();
    if (!wordUpper.includes(upper)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);

      if (newWrong >= MAX_WRONG) {
        // Lost
        if (timerRef.current) clearInterval(timerRef.current);
        setState('lost');
        const newStreak = updateStreak(false, targetWord.word);
        setWinStreak(newStreak);
      }
    } else {
      // Check if won
      const allRevealed = wordUpper.split('').every((ch) => newGuessed.has(ch));
      if (allRevealed) {
        if (timerRef.current) clearInterval(timerRef.current);
        setState('won');
        const newStreak = updateStreak(true, targetWord.word);
        setWinStreak(newStreak);

        const today = new Date().toISOString().split('T')[0];
        const scoreData: LocalScore = {
          displayName: profile?.displayName || 'Player',
          word: targetWord.word.toLowerCase(),
          won: true,
          wrongGuesses,
          hintsUsed,
          timeSeconds: elapsed,
          streak: newStreak,
          date: today,
        };

        if (mode === 'daily') {
          saveLocalScore(scoreData);
          setLeaderboard(getLocalLeaderboard(today));

          // Save to Firestore if logged in
          if (profile) {
            const fsScore: HangmanScore = { uid: profile.uid, ...scoreData };
            gameFirestoreImport().then((m) => m.saveHangmanScore(fsScore)).catch(() => {});
            const xpGain = Math.max(5, 30 - wrongGuesses * 5);
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
            .then((m) => m.getHangmanLeaderboard(today))
            .then((fsLb) => {
              if (fsLb.length > 0) {
                setLeaderboard(fsLb.map((s) => ({
                  displayName: s.displayName,
                  word: s.word,
                  won: s.won,
                  wrongGuesses: s.wrongGuesses,
                  hintsUsed: s.hintsUsed,
                  timeSeconds: s.timeSeconds,
                  streak: s.streak,
                  date: s.date,
                })));
              }
            })
            .catch(() => {});
        } else {
          // Practice: award small XP
          if (profile) {
            const xpGain = Math.max(3, 15 - wrongGuesses * 2);
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
      }
    }
  }, [targetWord, state, guessedLetters, wrongGuesses, elapsed, hintsUsed, mode, profile, setProfile]);

  const useHint = useCallback(() => {
    if (!targetWord || hintsUsed >= 3 || state !== 'playing') return;
    const nextHint = hintsUsed + 1;

    let hintText = '';
    const def = defs[targetWord.word.toLowerCase()];
    if (nextHint === 1) {
      hintText = `Part of speech: ${def?.p || targetWord.partOfSpeech || 'unknown'}`;
    } else if (nextHint === 2) {
      hintText = `Definition: ${def?.d || targetWord.meaning?.en || '(no definition)'}`;
    } else if (nextHint === 3) {
      // Reveal a random unrevealed letter
      const wordUpper = targetWord.word.toUpperCase();
      const unrevealed = wordUpper.split('').filter((ch) => !guessedLetters.has(ch));
      if (unrevealed.length > 0) {
        const revealChar = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        const newGuessed = new Set(guessedLetters);
        newGuessed.add(revealChar);
        setGuessedLetters(newGuessed);
        hintText = `Revealed letter: ${revealChar}`;

        // Check if this wins the game
        const allRevealed = wordUpper.split('').every((ch) => newGuessed.has(ch));
        if (allRevealed) {
          if (timerRef.current) clearInterval(timerRef.current);
          setState('won');
          const newStreakVal = updateStreak(true, targetWord.word);
          setWinStreak(newStreakVal);
        }
      }
    }

    setHintsUsed(nextHint);
    setRevealedHints((prev) => [...prev, hintText]);
  }, [targetWord, hintsUsed, guessedLetters, state]);

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

  const getWordDisplay = () => {
    if (!targetWord) return [];
    return targetWord.word.toUpperCase().split('').map((ch) => ({
      letter: ch,
      revealed: guessedLetters.has(ch),
    }));
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
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Skull className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hangman</h1>
          <p className="text-gray-500">
            Guess the word one letter at a time. 8 wrong guesses and it&apos;s game over!
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
              <span className="text-rose-500 font-bold">1.</span>
              A secret 7-letter word is chosen from the Oxford vocabulary.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">2.</span>
              Guess letters by clicking or typing. Correct letters are revealed.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">3.</span>
              Wrong guesses add body parts to the hangman. 8 wrong = game over.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">4.</span>
              Use hints to get clues (part of speech, definition, or reveal a letter).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">5.</span>
              <strong>Daily:</strong> Same word for everyone. Fewest wrong guesses wins!
            </li>
          </ul>
        </div>

        {/* Mode selection */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => startGame('daily')}
            className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-6 text-left hover:from-rose-600 hover:to-red-700 transition-all shadow-lg"
          >
            <Sparkles className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Daily Challenge</h3>
            <p className="text-white/70 text-sm">Same word for everyone. Compete for fewest mistakes!</p>
          </button>
          <button
            onClick={() => startGame('practice')}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-left hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
          >
            <RotateCcw className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Practice</h3>
            <p className="text-white/70 text-sm">Random word each time. Build your win streak!</p>
          </button>
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
                  <span className="text-sm text-gray-500">{entry.wrongGuesses} wrong</span>
                  <span className="text-xs text-gray-400">{formatTime(entry.timeSeconds)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── WON / LOST STATE ──────────────────────────────────────────────
  if ((state === 'won' || state === 'lost') && targetWord) {
    const def = defs[targetWord.word.toLowerCase()];

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{state === 'won' ? '🎉' : '💀'}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {state === 'won' ? 'You Won!' : 'Game Over'}
          </h1>
          <p className="text-gray-500">
            The word was{' '}
            <span className="font-bold text-indigo-600 text-lg">{targetWord.word.toUpperCase()}</span>
          </p>
          {def?.d && (
            <p className="text-sm text-gray-400 mt-1 italic">
              ({def.p}) {def.d}
            </p>
          )}
          {def?.e && (
            <p className="text-xs text-gray-400 mt-1">&ldquo;{def.e}&rdquo;</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{MAX_WRONG - wrongGuesses}</div>
            <div className="text-xs text-gray-400">Lives Left</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Skull className="w-6 h-6 text-gray-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{wrongGuesses}</div>
            <div className="text-xs text-gray-400">Wrong Guesses</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(elapsed)}</div>
            <div className="text-xs text-gray-400">Time</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <span className="block text-2xl mx-auto mb-1">🔥</span>
            <div className="text-2xl font-bold text-gray-800">{winStreak}</div>
            <div className="text-xs text-gray-400">Win Streak</div>
          </div>
        </div>

        {/* Hangman drawing (final state) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <HangmanDrawing wrongCount={wrongGuesses} />
        </div>

        {/* Leaderboard — daily mode only */}
        {mode === 'daily' && state === 'won' && (
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
                        isCurrentUser ? 'bg-rose-50 ring-1 ring-rose-200' : ''
                      }`}
                    >
                      {getRankIcon(i)}
                      <span className="flex-1 font-medium text-gray-700 truncate">
                        {entry.displayName}
                        {isCurrentUser && (
                          <span className="text-rose-500 text-xs ml-1">(You)</span>
                        )}
                      </span>
                      <span className="text-sm font-mono text-gray-600">{entry.wrongGuesses} wrong</span>
                      <span className="text-xs text-gray-400">{formatTime(entry.timeSeconds)}</span>
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
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            {mode === 'daily' ? 'Play Again' : 'New Word'}
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
  if (!targetWord) return null;

  const wordDisplay = getWordDisplay();
  const wrongLetters = Array.from(guessedLetters).filter(
    (l) => !targetWord.word.toUpperCase().includes(l)
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skull className="w-5 h-5 text-rose-600" />
          <span className="text-sm font-medium text-gray-600">
            {mode === 'daily' ? 'Daily Challenge' : 'Practice'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Lives */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: MAX_WRONG }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-all ${
                  i < MAX_WRONG - wrongGuesses
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          {/* Timer */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-mono text-lg font-bold text-gray-800">{formatTime(elapsed)}</span>
          </div>
        </div>
      </div>

      {/* Hangman Drawing */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <HangmanDrawing wrongCount={wrongGuesses} />
      </div>

      {/* Word Display */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-6">
        {wordDisplay.map((slot, i) => (
          <div
            key={i}
            className={`w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center border-b-4 text-2xl sm:text-3xl font-bold transition-all ${
              slot.revealed
                ? 'border-indigo-500 text-indigo-700'
                : 'border-gray-300'
            }`}
          >
            {slot.revealed ? slot.letter : ''}
          </div>
        ))}
      </div>

      {/* Wrong letters */}
      {wrongLetters.length > 0 && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xs text-gray-400">Wrong:</span>
          <div className="flex gap-1.5">
            {wrongLetters.map((l) => (
              <span key={l} className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-sm font-bold">
                {l}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1.5 mb-1.5 last:mb-0">
            {row.map((letter) => {
              const isGuessed = guessedLetters.has(letter);
              const isCorrect = isGuessed && targetWord.word.toUpperCase().includes(letter);
              const isWrong = isGuessed && !targetWord.word.toUpperCase().includes(letter);

              return (
                <button
                  key={letter}
                  onClick={() => handleGuess(letter)}
                  disabled={isGuessed}
                  className={`w-8 h-10 sm:w-10 sm:h-12 rounded-lg font-bold text-sm sm:text-base transition-all ${
                    isCorrect
                      ? 'bg-green-500 text-white shadow-green-200 shadow-sm'
                      : isWrong
                      ? 'bg-red-400 text-white opacity-50'
                      : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 active:scale-95'
                  } disabled:cursor-not-allowed`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Hints */}
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
            {hintsUsed >= 3 ? 'No more hints' : `Get Hint (${hintsUsed}/3)`}
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
          <p className="text-sm text-gray-400">Use hints to reveal clues about the word.</p>
        )}
      </div>

      {/* Streak display */}
      {winStreak > 0 && (
        <div className="text-center">
          <span className="text-sm text-amber-600 font-medium">🔥 {winStreak} win streak</span>
        </div>
      )}

      {/* Give up */}
      <div className="text-center mt-4">
        <button
          onClick={() => {
            if (timerRef.current) clearInterval(timerRef.current);
            const newStreak = updateStreak(false, targetWord.word);
            setWinStreak(newStreak);
            setState('lost');
          }}
          className="text-sm text-gray-400 hover:text-red-500 transition"
        >
          Give up &amp; reveal word
        </button>
      </div>
    </div>
  );
}
