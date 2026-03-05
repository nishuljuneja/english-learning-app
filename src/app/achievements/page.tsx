'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LevelBadge } from '@/components/Exercises';
import {
  Trophy, Flame, BookOpen, Brain, Star, Zap, Target,
  Award, Crown, Sparkles, Lock, CheckCircle2, ArrowRight,
} from 'lucide-react';
import type { UserProfile } from '@/lib/firestore';

// ─── Badge definitions ───────────────────────────────────────────────
interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  /** Returns true when the user has earned this badge */
  check: (p: UserProfile) => boolean;
  /** Returns progress 0-100 */
  progress: (p: UserProfile) => number;
  /** Human-readable requirement */
  requirement: string;
  category: 'streak' | 'xp' | 'vocabulary' | 'lessons' | 'level' | 'skill';
}

const BADGES: Badge[] = [
  // ── Streak badges ──
  {
    id: 'streak-3', title: 'Getting Started', description: '3-day learning streak',
    icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => p.streak >= 3, progress: (p) => Math.min(100, Math.round((p.streak / 3) * 100)),
    requirement: '3-day streak', category: 'streak',
  },
  {
    id: 'streak-7', title: 'Week Warrior', description: '7-day learning streak',
    icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => p.streak >= 7, progress: (p) => Math.min(100, Math.round((p.streak / 7) * 100)),
    requirement: '7-day streak', category: 'streak',
  },
  {
    id: 'streak-14', title: 'Fortnight Focus', description: '14-day learning streak',
    icon: Flame, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-300',
    check: (p) => p.streak >= 14, progress: (p) => Math.min(100, Math.round((p.streak / 14) * 100)),
    requirement: '14-day streak', category: 'streak',
  },
  {
    id: 'streak-30', title: 'Monthly Master', description: '30-day learning streak',
    icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300',
    check: (p) => p.streak >= 30, progress: (p) => Math.min(100, Math.round((p.streak / 30) * 100)),
    requirement: '30-day streak', category: 'streak',
  },

  // ── XP badges ──
  {
    id: 'xp-100', title: 'First Steps', description: 'Earn 100 XP',
    icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300',
    check: (p) => p.xp >= 100, progress: (p) => Math.min(100, Math.round((p.xp / 100) * 100)),
    requirement: '100 XP', category: 'xp',
  },
  {
    id: 'xp-500', title: 'Rising Star', description: 'Earn 500 XP',
    icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-300',
    check: (p) => p.xp >= 500, progress: (p) => Math.min(100, Math.round((p.xp / 500) * 100)),
    requirement: '500 XP', category: 'xp',
  },
  {
    id: 'xp-1000', title: 'Knowledge Seeker', description: 'Earn 1,000 XP',
    icon: Star, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => p.xp >= 1000, progress: (p) => Math.min(100, Math.round((p.xp / 1000) * 100)),
    requirement: '1,000 XP', category: 'xp',
  },
  {
    id: 'xp-5000', title: 'XP Champion', description: 'Earn 5,000 XP',
    icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => p.xp >= 5000, progress: (p) => Math.min(100, Math.round((p.xp / 5000) * 100)),
    requirement: '5,000 XP', category: 'xp',
  },

  // ── Vocabulary badges ──
  {
    id: 'words-10', title: 'Word Collector', description: 'Learn 10 words',
    icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => p.wordsLearned >= 10, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 10) * 100)),
    requirement: '10 words', category: 'vocabulary',
  },
  {
    id: 'words-50', title: 'Vocabulary Builder', description: 'Learn 50 words',
    icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => p.wordsLearned >= 50, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 50) * 100)),
    requirement: '50 words', category: 'vocabulary',
  },
  {
    id: 'words-200', title: 'Word Wizard', description: 'Learn 200 words',
    icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300',
    check: (p) => p.wordsLearned >= 200, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 200) * 100)),
    requirement: '200 words', category: 'vocabulary',
  },
  {
    id: 'words-500', title: 'Lexicon Legend', description: 'Learn 500 words',
    icon: Sparkles, color: 'text-violet-600', bg: 'bg-violet-100', border: 'border-violet-300',
    check: (p) => p.wordsLearned >= 500, progress: (p) => Math.min(100, Math.round((p.wordsLearned / 500) * 100)),
    requirement: '500 words', category: 'vocabulary',
  },

  // ── Lessons badges ──
  {
    id: 'lessons-5', title: 'Lesson Starter', description: 'Complete 5 lessons',
    icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.lessonsCompleted >= 5, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 5) * 100)),
    requirement: '5 lessons', category: 'lessons',
  },
  {
    id: 'lessons-20', title: 'Dedicated Student', description: 'Complete 20 lessons',
    icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300',
    check: (p) => p.lessonsCompleted >= 20, progress: (p) => Math.min(100, Math.round((p.lessonsCompleted / 20) * 100)),
    requirement: '20 lessons', category: 'lessons',
  },

  // ── Level badges ──
  {
    id: 'level-a2', title: 'Beyond Basics', description: 'Reach level A2',
    icon: Target, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300',
    check: (p) => ['A2', 'B1', 'B2', 'C1', 'C2'].includes(p.currentLevel),
    progress: (p) => ['A2', 'B1', 'B2', 'C1', 'C2'].includes(p.currentLevel) ? 100 : 0,
    requirement: 'Reach A2', category: 'level',
  },
  {
    id: 'level-b1', title: 'Intermediate Achiever', description: 'Reach level B1',
    icon: Target, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300',
    check: (p) => ['B1', 'B2', 'C1', 'C2'].includes(p.currentLevel),
    progress: (p) => ['B1', 'B2', 'C1', 'C2'].includes(p.currentLevel) ? 100 : 0,
    requirement: 'Reach B1', category: 'level',
  },
  {
    id: 'level-b2', title: 'Upper Intermediate', description: 'Reach level B2',
    icon: Award, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => ['B2', 'C1', 'C2'].includes(p.currentLevel),
    progress: (p) => ['B2', 'C1', 'C2'].includes(p.currentLevel) ? 100 : 0,
    requirement: 'Reach B2', category: 'level',
  },
  {
    id: 'level-c1', title: 'Advanced Master', description: 'Reach level C1',
    icon: Crown, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-300',
    check: (p) => ['C1', 'C2'].includes(p.currentLevel),
    progress: (p) => ['C1', 'C2'].includes(p.currentLevel) ? 100 : 0,
    requirement: 'Reach C1', category: 'level',
  },

  // ── Skill badges ──
  {
    id: 'skill-all-40', title: 'Well Rounded', description: 'Score 40%+ in all 6 skills',
    icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300',
    check: (p) => Object.values(p.skillScores).every((s) => s >= 40),
    progress: (p) => {
      const scores = Object.values(p.skillScores);
      const above = scores.filter((s) => s >= 40).length;
      return Math.round((above / scores.length) * 100);
    },
    requirement: '40%+ in all skills', category: 'skill',
  },
  {
    id: 'skill-any-80', title: 'Skill Specialist', description: 'Score 80%+ in any skill',
    icon: Award, color: 'text-pink-600', bg: 'bg-pink-100', border: 'border-pink-300',
    check: (p) => Object.values(p.skillScores).some((s) => s >= 80),
    progress: (p) => {
      const max = Math.max(...Object.values(p.skillScores));
      return Math.min(100, Math.round((max / 80) * 100));
    },
    requirement: '80%+ in any skill', category: 'skill',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'streak', label: 'Streak' },
  { key: 'xp', label: 'XP' },
  { key: 'vocabulary', label: 'Words' },
  { key: 'lessons', label: 'Lessons' },
  { key: 'level', label: 'Level' },
  { key: 'skill', label: 'Skills' },
];

export default function AchievementsPage() {
  const { profile, uiLanguage, loading, refreshProfile } = useAppStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const earned = useMemo(
    () => (profile ? BADGES.filter((b) => b.check(profile)) : []),
    [profile]
  );

  const displayed = useMemo(
    () => filter === 'all' ? BADGES : BADGES.filter((b) => b.category === filter),
    [filter]
  );

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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view achievements</h1>
        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
          {t('common.login', uiLanguage)} →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
          <Trophy className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
          <p className="text-gray-500 text-sm">
            {earned.length} / {BADGES.length} badges earned
          </p>
        </div>
      </div>

      {/* Summary bar */}
      <div className="mt-4 mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-700"
            style={{ width: `${Math.round((earned.length / BADGES.length) * 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 mt-1 text-right">
          {Math.round((earned.length / BADGES.length) * 100)}% complete
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === cat.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((badge) => {
          const isEarned = badge.check(profile);
          const pct = badge.progress(profile);
          const Icon = badge.icon;

          return (
            <div
              key={badge.id}
              className={`relative rounded-2xl p-5 border-2 transition-all ${
                isEarned
                  ? `${badge.border} ${badge.bg} shadow-md`
                  : 'border-gray-200 bg-white opacity-70'
              }`}
            >
              {isEarned && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              )}
              {!isEarned && (
                <div className="absolute top-3 right-3">
                  <Lock className="w-4 h-4 text-gray-300" />
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                isEarned ? badge.bg : 'bg-gray-100'
              }`}>
                <Icon className={`w-6 h-6 ${isEarned ? badge.color : 'text-gray-400'}`} />
              </div>

              <h3 className={`font-bold mb-1 ${isEarned ? 'text-gray-800' : 'text-gray-500'}`}>
                {badge.title}
              </h3>
              <p className={`text-sm mb-3 ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                {badge.description}
              </p>

              {!isEarned && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-indigo-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">{pct}% — {badge.requirement}</p>
                </>
              )}
              {isEarned && (
                <p className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Earned!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
