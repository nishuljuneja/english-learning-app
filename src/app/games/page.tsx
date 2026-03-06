'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Gamepad2, LetterText, ArrowRight, Trophy, Clock, Lightbulb, Skull, Heart, Shuffle, Crown, Medal, Layers, RotateCcw } from 'lucide-react';

// Lazy-load Firestore
const gameFirestoreImport = () => import('@/lib/game-firestore');

// ─── Local leaderboard helpers (mirror what each game stores) ────────

function getLocalLB(key: string, date: string): Record<string, unknown>[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    const all: Record<string, unknown>[] = raw ? JSON.parse(raw) : [];
    return all.filter((s) => s.date === date).slice(0, 20);
  } catch {
    return [];
  }
}

type GameTab = 'unjumble' | 'hangman' | 'scramble' | 'wordmatch';

interface LeaderboardEntry {
  displayName: string;
  metric: string;      // primary display metric
  secondary?: string;  // secondary info
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function GamesPage() {
  const { uiLanguage, profile } = useAppStore();
  const [activeTab, setActiveTab] = useState<GameTab>('unjumble');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setLoading(true);
    setEntries([]);

    const loadLeaderboard = async () => {
      let result: LeaderboardEntry[] = [];

      try {
        const mod = await gameFirestoreImport();

        if (activeTab === 'unjumble') {
          const fs = await mod.getGameLeaderboardByDate(today);
          if (fs.length > 0) {
            result = fs.map((s) => ({
              displayName: s.displayName,
              metric: formatTime(s.adjustedTime),
              secondary: s.hintsUsed > 0 ? `${s.hintsUsed} hints` : undefined,
            }));
          }
        } else if (activeTab === 'hangman') {
          const fs = await mod.getHangmanLeaderboard(today);
          if (fs.length > 0) {
            result = fs.map((s) => ({
              displayName: s.displayName,
              metric: `${s.wrongGuesses} wrong`,
              secondary: formatTime(s.timeSeconds),
            }));
          }
        } else if (activeTab === 'scramble') {
          const fs = await mod.getScrambleLeaderboard(today);
          if (fs.length > 0) {
            result = fs.map((s) => ({
              displayName: s.displayName,
              metric: formatTime(s.adjustedTime),
              secondary: s.hintsUsed > 0 ? `${s.hintsUsed} hints` : undefined,
            }));
          }
        } else if (activeTab === 'wordmatch') {
          const fs = await mod.getWordMatchLeaderboard(today);
          if (fs.length > 0) {
            result = fs.map((s) => ({
              displayName: s.displayName,
              metric: `${s.moves} moves`,
              secondary: formatTime(s.timeSeconds),
            }));
          }
        }
      } catch {}

      // Fallback to localStorage if Firestore returned nothing
      if (result.length === 0) {
        const lbKey = activeTab === 'unjumble' ? 'speakeasy-word-puzzle-lb'
          : activeTab === 'hangman' ? 'speakeasy-hangman-lb'
          : activeTab === 'wordmatch' ? 'speakeasy-wordmatch-lb'
          : 'speakeasy-scramble-lb';
        const local = getLocalLB(lbKey, today);

        if (activeTab === 'hangman') {
          result = local
            .filter((s: any) => s.won)
            .sort((a: any, b: any) => (a.wrongGuesses ?? 99) - (b.wrongGuesses ?? 99) || (a.timeSeconds ?? 0) - (b.timeSeconds ?? 0))
            .map((s: any) => ({
              displayName: s.displayName || 'Player',
              metric: `${s.wrongGuesses} wrong`,
              secondary: formatTime(s.timeSeconds ?? 0),
            }));
        } else if (activeTab === 'wordmatch') {
          result = local
            .sort((a: any, b: any) => (a.moves ?? 999) - (b.moves ?? 999) || (a.timeSeconds ?? 0) - (b.timeSeconds ?? 0))
            .map((s: any) => ({
              displayName: s.displayName || 'Player',
              metric: `${s.moves} moves`,
              secondary: formatTime(s.timeSeconds ?? 0),
            }));
        } else {
          result = local
            .sort((a: any, b: any) => (a.adjustedTime || 999) - (b.adjustedTime || 999))
            .map((s: any) => ({
              displayName: s.displayName || 'Player',
              metric: formatTime(s.adjustedTime ?? s.timeSeconds ?? 0),
              secondary: s.hintsUsed > 0 ? `${s.hintsUsed} hints` : undefined,
            }));
        }
      }

      setEntries(result.slice(0, 10));
      setLoading(false);
    };

    loadLeaderboard();
  }, [activeTab, today]);

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

  const tabs: { key: GameTab; label: string; color: string; activeColor: string }[] = [
    { key: 'unjumble', label: 'Un-Jumble', color: 'text-gray-600 hover:text-indigo-600', activeColor: 'text-indigo-700 border-indigo-600 bg-indigo-50' },
    { key: 'hangman', label: 'Hangman', color: 'text-gray-600 hover:text-rose-600', activeColor: 'text-rose-700 border-rose-600 bg-rose-50' },
    { key: 'scramble', label: 'Scramble', color: 'text-gray-600 hover:text-cyan-600', activeColor: 'text-cyan-700 border-cyan-600 bg-cyan-50' },
    { key: 'wordmatch', label: 'Word Match', color: 'text-gray-600 hover:text-emerald-600', activeColor: 'text-emerald-700 border-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Games</h1>
          <p className="text-gray-500 text-sm">Learn English while having fun!</p>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Daily Un-Jumble */}
        <Link
          href="/games/word-puzzle"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
        >
          <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <LetterText className="w-10 h-10" />
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                Daily Challenge
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">Daily Un-Jumble</h2>
            <p className="text-white/80 text-sm">
              Unscramble 7 letters and find as many words as you can!
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                Timed
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Hints
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition">
                Play Now
              </span>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Hangman */}
        <Link
          href="/games/hangman"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
        >
          <div className="bg-gradient-to-br from-rose-500 to-red-600 p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <Skull className="w-10 h-10" />
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                Daily Challenge
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">Hangman</h2>
            <p className="text-white/80 text-sm">
              Guess the word before the hangman is complete!
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Heart className="w-4 h-4 text-red-400" />
                8 Lives
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Hints
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-rose-600 group-hover:text-rose-800 transition">
                Play Now
              </span>
              <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Sentence Scramble */}
        <Link
          href="/games/sentence-scramble"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
        >
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <Shuffle className="w-10 h-10" />
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                Daily Challenge
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">Sentence Scramble</h2>
            <p className="text-white/80 text-sm">
              Unscramble words to build the correct sentence!
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                Timed
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                3 Hints
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-cyan-600 group-hover:text-cyan-800 transition">
                Play Now
              </span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Word Match */}
        <Link
          href="/games/word-match"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
        >
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <Layers className="w-10 h-10" />
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
                Daily Challenge
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">Word Match</h2>
            <p className="text-white/80 text-sm">
              Flip cards to match words with their definitions!
            </p>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4 text-gray-400" />
                Memory
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                3 Peeks
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-800 transition">
                Play Now
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* Unified Leaderboard */}
      <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header & Tabs */}
        <div className="px-6 pt-5 pb-0">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-bold text-gray-800">Today&apos;s Leaderboard</h2>
          </div>
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all rounded-t-lg ${
                  activeTab === tab.key
                    ? tab.activeColor
                    : `${tab.color} border-transparent`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard content */}
        <div className="px-6 py-5 min-h-[120px]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : entries.length > 0 ? (
            <div className="space-y-2">
              {entries.map((entry, i) => {
                const isCurrentUser = entry.displayName === (profile?.displayName || 'Player');
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition ${
                      isCurrentUser ? 'bg-indigo-50 ring-1 ring-indigo-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    {getRankIcon(i)}
                    <span className="flex-1 font-medium text-gray-700 truncate">
                      {entry.displayName}
                      {isCurrentUser && (
                        <span className="text-indigo-500 text-xs ml-1">(You)</span>
                      )}
                    </span>
                    <span className="text-sm font-mono text-gray-600">{entry.metric}</span>
                    {entry.secondary && (
                      <span className="text-xs text-gray-400">{entry.secondary}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No scores yet today. Be the first to play!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
