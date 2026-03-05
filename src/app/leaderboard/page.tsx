'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { getLeaderboard } from '@/lib/firestore';
import { Trophy, Medal, Flame, Crown } from 'lucide-react';
import { LevelBadge } from '@/components/Exercises';

interface LeaderboardEntry {
  id: string;
  displayName: string;
  xp: number;
  streak: number;
  currentLevel: string;
  wordsLearned: number;
}

export default function LeaderboardPage() {
  const { user, uiLanguage } = useAppStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'xp' | 'streak' | 'words'>('xp');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLeaderboard(50);
        setEntries(data as unknown as LeaderboardEntry[]);
      } catch {
        // Use sample data if Firestore isn't configured
        setEntries([
          { id: '1', displayName: 'Priya S.', xp: 4520, streak: 45, currentLevel: 'B2', wordsLearned: 380 },
          { id: '2', displayName: 'Rahul K.', xp: 3890, streak: 32, currentLevel: 'B1', wordsLearned: 290 },
          { id: '3', displayName: 'Ananya M.', xp: 3650, streak: 28, currentLevel: 'B2', wordsLearned: 340 },
          { id: '4', displayName: 'Vikram P.', xp: 3200, streak: 21, currentLevel: 'B1', wordsLearned: 250 },
          { id: '5', displayName: 'Deepa R.', xp: 2800, streak: 19, currentLevel: 'A2', wordsLearned: 180 },
          { id: '6', displayName: 'Arjun N.', xp: 2450, streak: 15, currentLevel: 'A2', wordsLearned: 160 },
          { id: '7', displayName: 'Kavitha L.', xp: 2100, streak: 12, currentLevel: 'B1', wordsLearned: 200 },
          { id: '8', displayName: 'Suresh D.', xp: 1800, streak: 10, currentLevel: 'A1', wordsLearned: 95 },
          { id: '9', displayName: 'Meera G.', xp: 1500, streak: 8, currentLevel: 'A1', wordsLearned: 72 },
          { id: '10', displayName: 'Amit T.', xp: 1200, streak: 5, currentLevel: 'A1', wordsLearned: 50 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sorted = [...entries].sort((a, b) => {
    if (tab === 'xp') return b.xp - a.xp;
    if (tab === 'streak') return b.streak - a.streak;
    return b.wordsLearned - a.wordsLearned;
  });

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-400">{index + 1}</span>;
  };

  const getRankBg = (index: number) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
    if (index === 1) return 'bg-gray-50 border-gray-200';
    if (index === 2) return 'bg-orange-50 border-orange-200';
    return 'bg-white border-gray-100';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('nav.leaderboard', uiLanguage)}</h1>
          <p className="text-gray-500 text-sm">See how you rank among other learners</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        {[
          { key: 'xp' as const, label: 'XP', icon: Trophy },
          { key: 'streak' as const, label: 'Streak', icon: Flame },
          { key: 'words' as const, label: 'Words', icon: Medal },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
              tab === key ? 'bg-white shadow text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-16 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((entry, index) => {
            const isCurrentUser = user?.uid === entry.id;
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-4 rounded-xl p-4 border transition-all ${getRankBg(index)} ${
                  isCurrentUser ? 'ring-2 ring-indigo-400' : ''
                }`}
              >
                <div className="flex-shrink-0">{getRankIcon(index)}</div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                  {entry.displayName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {entry.displayName}
                    {isCurrentUser && <span className="text-indigo-500 text-xs ml-2">(You)</span>}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <LevelBadge level={entry.currentLevel as any} size="sm" />
                    <span>{entry.wordsLearned} words</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-gray-800">
                    {tab === 'xp' && `${entry.xp.toLocaleString()} XP`}
                    {tab === 'streak' && `${entry.streak} days`}
                    {tab === 'words' && `${entry.wordsLearned}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
