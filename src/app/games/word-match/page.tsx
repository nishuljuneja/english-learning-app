'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { allVocabulary } from '@/content/vocabulary';
import definitions from '@/content/word-definitions.json';
import {
  Clock, Trophy, RotateCcw, Crown, Medal, Sparkles,
  ArrowLeft, Layers, Eye, Lock,
} from 'lucide-react';
import { isPro } from '@/lib/subscription';
import { ProBadge } from '@/components/ProGate';

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

type GameMode = 'daily' | 'practice';
type GameState = 'idle' | 'playing' | 'won';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Card {
  id: number;
  pairId: number;
  type: 'word' | 'definition';
  content: string;
  flipped: boolean;
  matched: boolean;
}

interface WordMatchScore {
  uid: string;
  displayName: string;
  moves: number;
  pairs: number;
  timeSeconds: number;
  difficulty: string;
  date: string;
}

interface LocalScore {
  displayName: string;
  moves: number;
  pairs: number;
  timeSeconds: number;
  difficulty: string;
  date: string;
}

// Lazy-load Firestore
const firestoreImport = () => import('@/lib/firestore');
const gameFirestoreImport = () => import('@/lib/game-firestore');

// ─── Word Pool ───────────────────────────────────────────────────────
const defs = definitions as Record<string, { d?: string; e?: string; p?: string }>;

// Words that have definitions and are 4-9 chars (readable on cards)
const WORD_POOL = allVocabulary.filter(
  (w) =>
    w.word.length >= 4 &&
    w.word.length <= 9 &&
    /^[a-z]+$/i.test(w.word) &&
    defs[w.word.toLowerCase()]?.d &&
    (defs[w.word.toLowerCase()]?.d?.length ?? 0) <= 60
) as VocabularyWord[];

const DIFFICULTY_CONFIG: Record<Difficulty, { pairs: number; cols: number; label: string }> = {
  easy: { pairs: 6, cols: 3, label: '6 Pairs (3×4)' },
  medium: { pairs: 8, cols: 4, label: '8 Pairs (4×4)' },
  hard: { pairs: 10, cols: 4, label: '10 Pairs (4×5)' },
};

// ─── Helpers ─────────────────────────────────────────────────────────

function getDailyWords(count: number): VocabularyWord[] {
  const today = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  // Pick `count` deterministic words spread across the pool
  const words: VocabularyWord[] = [];
  const usedIndices = new Set<number>();
  for (let i = 0; i < count; i++) {
    let idx = Math.abs(hash + i * 2741 + i * i * 13) % WORD_POOL.length;
    while (usedIndices.has(idx)) {
      idx = (idx + 1) % WORD_POOL.length;
    }
    usedIndices.add(idx);
    words.push(WORD_POOL[idx]);
  }
  return words;
}

function getRandomWords(count: number): VocabularyWord[] {
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createCards(words: VocabularyWord[]): Card[] {
  const cards: Card[] = [];
  words.forEach((w, i) => {
    const def = defs[w.word.toLowerCase()];
    cards.push({
      id: i * 2,
      pairId: i,
      type: 'word',
      content: w.word.charAt(0).toUpperCase() + w.word.slice(1).toLowerCase(),
      flipped: false,
      matched: false,
    });
    cards.push({
      id: i * 2 + 1,
      pairId: i,
      type: 'definition',
      content: def?.d || w.meaning?.en || 'No definition',
      flipped: false,
      matched: false,
    });
  });
  return shuffleArray(cards);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ─── Local storage helpers ───────────────────────────────────────────

const LB_KEY = 'speakeasy-wordmatch-lb';

function getLocalLeaderboard(date: string): LocalScore[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LB_KEY);
    const all: LocalScore[] = raw ? JSON.parse(raw) : [];
    return all
      .filter((s) => s.date === date)
      .sort((a, b) => a.moves - b.moves || a.timeSeconds - b.timeSeconds)
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
    localStorage.setItem(LB_KEY, JSON.stringify(all.slice(-100)));
  } catch {}
}

// ─── Component ───────────────────────────────────────────────────────

export default function WordMatchPage() {
  const { profile, setProfile } = useAppStore();

  const [mode, setMode] = useState<GameMode>('daily');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [state, setState] = useState<GameState>('idle');

  // Game data
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [lockBoard, setLockBoard] = useState(false);

  // Timer
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  // Peek
  const [peeksUsed, setPeeksUsed] = useState(0);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LocalScore[]>([]);

  // Load leaderboard on mount
  useEffect(() => {
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

  const startGame = useCallback((m: GameMode, diff: Difficulty) => {
    const config = DIFFICULTY_CONFIG[diff];
    const words = m === 'daily' ? getDailyWords(config.pairs) : getRandomWords(config.pairs);
    const newCards = createCards(words);

    setMode(m);
    setDifficulty(diff);
    setCards(newCards);
    setFlippedIds([]);
    setMoves(0);
    setMatchedPairs(0);
    setTotalPairs(config.pairs);
    setElapsed(0);
    setPeeksUsed(0);
    setLockBoard(false);
    setState('playing');
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    if (lockBoard || state !== 'playing') return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    // Flip the card
    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;
      const first = newCards.find((c) => c.id === firstId)!;
      const second = newCards.find((c) => c.id === secondId)!;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // Match found!
        const matched = newCards.map((c) =>
          c.pairId === first.pairId ? { ...c, matched: true } : c
        );
        setCards(matched);
        setFlippedIds([]);
        const newMatchedPairs = matchedPairs + 1;
        setMatchedPairs(newMatchedPairs);

        // Check if game is won
        if (newMatchedPairs === totalPairs) {
          if (timerRef.current) clearInterval(timerRef.current);
          setState('won');
          handleWin(newMatchedPairs, moves + 1);
        }
      } else {
        // No match – flip back after delay
        setLockBoard(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedIds([]);
          setLockBoard(false);
        }, 2000);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, flippedIds, lockBoard, state, matchedPairs, totalPairs, moves]);

  const handleWin = useCallback((pairs: number, finalMoves: number) => {
    const today = new Date().toISOString().split('T')[0];
    const adjustedMoves = finalMoves + peeksUsed * 3; // peek penalty

    const scoreData: LocalScore = {
      displayName: profile?.displayName || 'Player',
      moves: adjustedMoves,
      pairs,
      timeSeconds: elapsed,
      difficulty,
      date: today,
    };

    if (mode === 'daily') {
      saveLocalScore(scoreData);
      setLeaderboard(getLocalLeaderboard(today));

      // Save to Firestore if logged in
      if (profile) {
        const fsScore: WordMatchScore = { uid: profile.uid, ...scoreData };
        gameFirestoreImport().then((m) => m.saveWordMatchScore(fsScore)).catch(() => {});
        const xpGain = Math.max(5, 25 - Math.floor(finalMoves / 3));
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
            setProfile({ ...profile, xp: profile.xp + Math.max(5, 25 - Math.floor(finalMoves / 3)) });
          });
      }

      // Try Firestore leaderboard
      gameFirestoreImport()
        .then((m) => m.getWordMatchLeaderboard(today))
        .then((fsLb) => {
          if (fsLb.length > 0) {
            setLeaderboard(fsLb.map((s) => ({
              displayName: s.displayName,
              moves: s.moves,
              pairs: s.pairs,
              timeSeconds: s.timeSeconds,
              difficulty: s.difficulty,
              date: s.date,
            })));
          }
        })
        .catch(() => {});
    } else {
      // Practice: small XP
      if (profile) {
        const xpGain = Math.max(3, 12 - Math.floor(finalMoves / 4));
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, setProfile, mode, elapsed, difficulty, peeksUsed]);

  const usePeek = useCallback(() => {
    if (peeksUsed >= 3 || state !== 'playing' || lockBoard) return;
    setPeeksUsed((p) => p + 1);

    // Briefly flip all unmatched cards
    setLockBoard(true);
    setCards((prev) => prev.map((c) => (c.matched ? c : { ...c, flipped: true })));
    setTimeout(() => {
      setCards((prev) => prev.map((c) => (c.matched ? c : { ...c, flipped: false })));
      setFlippedIds([]);
      setLockBoard(false);
    }, 1200);
  }, [peeksUsed, state, lockBoard]);

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
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> All Games
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pairs</h1>
          <p className="text-gray-500">
            Flip cards to match words with their definitions. Test your memory!
          </p>
        </div>

        {/* Rules */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">How to play</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">1.</span>
              Cards are placed face-down in a grid. Each has a word or definition.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">2.</span>
              Flip two cards at a time. Match a word with its definition!
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">3.</span>
              Matched pairs stay face-up. Mismatches flip back after a moment.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">4.</span>
              Use &quot;Hint&quot; to briefly reveal all cards (costs +3 moves penalty).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">5.</span>
              <strong>Daily:</strong> Same words for everyone. Fewest moves wins!
            </li>
          </ul>
        </div>

        {/* Difficulty selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">Difficulty</h2>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                  difficulty === d
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <div className="capitalize font-bold">{d}</div>
                <div className="text-xs mt-0.5 opacity-70">{DIFFICULTY_CONFIG[d].label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode selection */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => startGame('daily', difficulty)}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-left hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
          >
            <Sparkles className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Daily Challenge</h3>
            <p className="text-white/70 text-sm">Same words for everyone. Compete for fewest moves!</p>
          </button>
          <button
            onClick={() => { if (isPro(profile)) startGame('practice', difficulty); else window.location.href = '/pricing'; }}
            className={`bg-gradient-to-br text-white rounded-2xl p-6 text-left transition-all shadow-lg ${
              isPro(profile)
                ? 'from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700'
                : 'from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <RotateCcw className="w-8 h-8" />
              {!isPro(profile) && <ProBadge />}
            </div>
            <h3 className="text-lg font-bold mb-1">Practice</h3>
            <p className="text-white/70 text-sm">
              {isPro(profile) ? 'Random words each time. Sharpen your memory!' : 'Upgrade to Pro for unlimited practice.'}
            </p>
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
                  <span className="text-sm text-gray-500">{entry.moves} moves</span>
                  <span className="text-xs text-gray-400">{formatTime(entry.timeSeconds)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── WON STATE ─────────────────────────────────────────────────────
  if (state === 'won') {
    const adjustedMoves = moves + peeksUsed * 3;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Matched!</h1>
          <p className="text-gray-500">
            You matched all {totalPairs} pairs
            {peeksUsed > 0 && ` (${peeksUsed} hint${peeksUsed > 1 ? 's' : ''} used)`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Layers className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{totalPairs}</div>
            <div className="text-xs text-gray-400">Pairs</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <RotateCcw className="w-6 h-6 text-blue-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{adjustedMoves}</div>
            <div className="text-xs text-gray-400">Moves</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Clock className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(elapsed)}</div>
            <div className="text-xs text-gray-400">Time</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <Eye className="w-6 h-6 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-bold text-gray-800">{peeksUsed}</div>
            <div className="text-xs text-gray-400">Hints</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => startGame(mode, difficulty)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl py-3.5 font-medium hover:from-emerald-600 hover:to-teal-700 transition shadow-lg"
          >
            <RotateCcw className="w-4 h-4" /> Play Again
          </button>
          <Link
            href="/games"
            className="flex items-center justify-center gap-2 bg-white text-gray-700 rounded-xl py-3.5 font-medium border border-gray-200 hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All Games
          </Link>
        </div>

        {/* Leaderboard — daily only */}
        {mode === 'daily' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
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
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition ${
                        isCurrentUser ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      {getRankIcon(i)}
                      <span className="flex-1 font-medium text-gray-700 truncate">
                        {entry.displayName}
                        {isCurrentUser && (
                          <span className="text-emerald-500 text-xs ml-1">(You)</span>
                        )}
                      </span>
                      <span className="text-sm font-mono text-gray-600">{entry.moves} moves</span>
                      <span className="text-xs text-gray-400">{formatTime(entry.timeSeconds)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <Trophy className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No scores yet today.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── PLAYING STATE ─────────────────────────────────────────────────
  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            if (timerRef.current) clearInterval(timerRef.current);
            setState('idle');
          }}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-mono">{formatTime(elapsed)}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-emerald-600">{matchedPairs}</span>
            <span className="text-gray-400">/{totalPairs}</span>
          </div>
          <div className="text-sm text-gray-600">
            {moves} move{moves !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Peek button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={usePeek}
          disabled={peeksUsed >= 3 || lockBoard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
        >
          <Eye className="w-4 h-4" />
          Hint ({3 - peeksUsed} left)
        </button>
      </div>

      {/* Card Grid */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.flipped || card.matched || lockBoard}
            className={`relative aspect-[3/4] rounded-xl border-2 transition-all duration-300 transform ${
              card.matched
                ? 'border-emerald-300 bg-emerald-50 scale-95'
                : card.flipped
                ? 'border-indigo-400 bg-white shadow-lg scale-105'
                : 'border-gray-200 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 cursor-pointer hover:shadow-md hover:scale-[1.02]'
            }`}
            style={{ perspective: '1000px' }}
          >
            {card.flipped || card.matched ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <span
                  className={`text-xs font-semibold mb-1 px-2 py-0.5 rounded-full ${
                    card.type === 'word'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {card.type === 'word' ? 'WORD' : 'DEF'}
                </span>
                <span
                  className={`text-center leading-tight ${
                    card.type === 'word'
                      ? 'text-sm sm:text-base font-bold text-gray-800'
                      : 'text-xs sm:text-sm text-gray-600'
                  }`}
                >
                  {card.content}
                </span>
                {card.matched && (
                  <span className="absolute top-1.5 right-1.5 text-emerald-500 text-lg">✓</span>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold opacity-30">?</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
