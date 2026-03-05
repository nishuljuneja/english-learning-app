'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { ProgressBar, LevelBadge } from '@/components/Exercises';
import {
  Flame, Trophy, BookOpen, Brain, Headphones, MessageSquare, PenTool,
  TrendingUp, Target, Star, Zap, Award, ChevronRight, ArrowRight,
} from 'lucide-react';
import type { SkillType } from '@/lib/firestore';

// Motivational messages based on streak
function getMotivation(streak: number, xp: number): { emoji: string; message: string } {
  if (streak >= 30) return { emoji: '🏆', message: "Incredible! 30+ day streak — you're unstoppable!" };
  if (streak >= 14) return { emoji: '🔥', message: "Two weeks strong! Your consistency is paying off." };
  if (streak >= 7) return { emoji: '⭐', message: "A full week! Great habit building." };
  if (streak >= 3) return { emoji: '💪', message: "3-day streak! Keep the momentum going." };
  if (streak >= 1) return { emoji: '🌱', message: "You showed up today — that's what matters!" };
  if (xp > 0) return { emoji: '👋', message: "Welcome back! Start a streak today." };
  return { emoji: '🚀', message: "Begin your English journey today!" };
}

// XP-based title
function getTitle(xp: number): string {
  if (xp >= 10000) return 'Language Master';
  if (xp >= 5000) return 'Expert Learner';
  if (xp >= 2000) return 'Dedicated Student';
  if (xp >= 1000) return 'Rising Star';
  if (xp >= 500) return 'Active Learner';
  if (xp >= 100) return 'Enthusiastic Beginner';
  return 'New Explorer';
}

// Next milestone
function getNextMilestone(xp: number): { target: number; label: string } {
  const milestones = [
    { target: 100, label: 'Enthusiastic Beginner' },
    { target: 500, label: 'Active Learner' },
    { target: 1000, label: 'Rising Star' },
    { target: 2000, label: 'Dedicated Student' },
    { target: 5000, label: 'Expert Learner' },
    { target: 10000, label: 'Language Master' },
  ];
  return milestones.find((m) => m.target > xp) || { target: xp + 1000, label: 'Beyond Master' };
}

// Level progression percentage
function levelProgress(level: string): { pct: number; next: string } {
  const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const idx = order.indexOf(level);
  return { pct: Math.round(((idx + 1) / order.length) * 100), next: order[idx + 1] || 'C2' };
}

const skillConfig: { key: SkillType; label: string; icon: React.ElementType; color: string; bg: string; href: string }[] = [
  { key: 'vocabulary', label: 'Vocabulary', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', href: '/vocabulary' },
  { key: 'grammar', label: 'Grammar', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100', href: '/grammar' },
  { key: 'reading', label: 'Reading', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100', href: '/reading' },
  { key: 'listening', label: 'Listening', icon: Headphones, color: 'text-orange-600', bg: 'bg-orange-100', href: '/listening' },
  { key: 'writing', label: 'Writing', icon: PenTool, color: 'text-pink-600', bg: 'bg-pink-100', href: '/writing' },
  { key: 'speaking', label: 'Speaking', icon: MessageSquare, color: 'text-teal-600', bg: 'bg-teal-100', href: '/speaking' },
];

export default function ProgressPage() {
  const { profile, uiLanguage, loading } = useAppStore();

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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your progress</h1>
        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
          {t('common.login', uiLanguage)} →
        </Link>
      </div>
    );
  }

  const motivation = getMotivation(profile.streak, profile.xp);
  const title = getTitle(profile.xp);
  const milestone = getNextMilestone(profile.xp);
  const { pct: levelPct, next: nextLevel } = levelProgress(profile.currentLevel);

  // Overall score (average of all skills)
  const skillEntries = Object.entries(profile.skillScores) as [SkillType, number][];
  const overallScore = skillEntries.length
    ? Math.round(skillEntries.reduce((sum, [, v]) => sum + v, 0) / skillEntries.length)
    : 0;

  // Days since joined
  const daysSinceJoined = profile.createdAt
    ? Math.max(1, Math.floor((Date.now() - profile.createdAt.toDate().getTime()) / 86400000))
    : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header with motivation */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute -right-8 -top-8 text-[120px] opacity-10 select-none">{motivation.emoji}</div>
        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">Your Progress</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{motivation.message}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Award className="w-4 h-4" /> {title}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <LevelBadge level={profile.currentLevel} size="sm" />
            </span>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.streak}</div>
          <div className="text-sm text-gray-500">Day Streak</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.xp.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total XP</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.wordsLearned}</div>
          <div className="text-sm text-gray-500">Words Learned</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.lessonsCompleted}</div>
          <div className="text-sm text-gray-500">Lessons Done</div>
        </div>
      </div>

      {/* Level & XP Milestones */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Level Progression */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-800">Level Progression</h2>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <LevelBadge level={profile.currentLevel} size="lg" />
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Current: {profile.currentLevel}</span>
                <span>Next: {nextLevel}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${levelPct}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Complete more exercises across all skills to level up to {nextLevel}.
          </p>
        </div>

        {/* XP Milestone */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-bold text-gray-800">Next Milestone</h2>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">🏅</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-700">{milestone.label}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{profile.xp.toLocaleString()} XP</span>
                <span>{milestone.target.toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, Math.round((profile.xp / milestone.target) * 100))}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            {milestone.target - profile.xp > 0
              ? `${(milestone.target - profile.xp).toLocaleString()} XP to go — keep practicing!`
              : 'Milestone reached!'}
          </p>
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-800">Skill Breakdown</h2>
          </div>
          <div className="text-sm text-gray-500">
            Overall: <span className="font-bold text-indigo-600">{overallScore}%</span>
          </div>
        </div>

        <div className="space-y-4">
          {skillConfig.map((skill) => {
            const score = profile.skillScores[skill.key] || 0;
            return (
              <Link
                key={skill.key}
                href={skill.href}
                className="flex items-center gap-4 group"
              >
                <div className={`w-10 h-10 ${skill.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <skill.icon className={`w-5 h-5 ${skill.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                      {skill.label}
                    </span>
                    <span className="text-sm font-bold text-gray-600">{score}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${
                        score >= 70 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Fun Facts / Encouragement */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 text-center">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-emerald-700">{profile.wordsLearned}</div>
          <p className="text-sm text-emerald-600 mt-1">
            {profile.wordsLearned >= 100
              ? "That's more than most beginners learn in a month!"
              : profile.wordsLearned >= 10
                ? 'Great start! Every word counts.'
                : 'Start reviewing vocabulary to build your word bank.'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 text-center">
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-amber-700">{daysSinceJoined}</div>
          <p className="text-sm text-amber-600 mt-1">
            {daysSinceJoined === 1 ? "Day one! You've taken the first step." : `days on your learning journey.`}
          </p>
        </div>
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-5 text-center">
          <div className="text-3xl mb-2">💡</div>
          <div className="text-2xl font-bold text-violet-700">{Math.round(profile.xp / Math.max(daysSinceJoined, 1))}</div>
          <p className="text-sm text-violet-600 mt-1">
            XP per day on average — {profile.xp / Math.max(daysSinceJoined, 1) >= 50 ? 'amazing pace!' : 'consistency is key!'}
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to keep going?</h3>
        <p className="text-white/70 text-sm mb-4">Every session brings you closer to fluency. Pick up where you left off!</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/vocabulary"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition"
          >
            <BookOpen className="w-4 h-4" /> Practice Vocabulary
          </Link>
          <Link
            href="/grammar"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition"
          >
            <Brain className="w-4 h-4" /> Learn Grammar
          </Link>
          <Link
            href="/reading"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition"
          >
            <ArrowRight className="w-4 h-4" /> Reading Exercises
          </Link>
        </div>
      </div>
    </div>
  );
}
