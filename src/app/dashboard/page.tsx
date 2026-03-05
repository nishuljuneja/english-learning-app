'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LevelBadge, ProgressBar } from '@/components/Exercises';
import { BookOpen, Brain, Headphones, MessageSquare, PenTool, Flame, Trophy, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { profile, uiLanguage, loading } = useAppStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your dashboard</h1>
        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
          {t('common.login', uiLanguage)} →
        </Link>
      </div>
    );
  }

  const skills = [
    { key: 'vocabulary', label: t('nav.vocabulary', uiLanguage), icon: BookOpen, href: '/vocabulary', color: 'bg-blue-500' },
    { key: 'grammar', label: t('nav.grammar', uiLanguage), icon: Brain, href: '/grammar', color: 'bg-purple-500' },
    { key: 'reading', label: t('nav.reading', uiLanguage), icon: BookOpen, href: '/reading', color: 'bg-green-500' },
    { key: 'listening', label: t('nav.listening', uiLanguage), icon: Headphones, href: '/listening', color: 'bg-orange-500' },
    { key: 'writing', label: t('nav.writing', uiLanguage), icon: PenTool, href: '/writing', color: 'bg-pink-500' },
    { key: 'speaking', label: t('nav.speaking', uiLanguage), icon: MessageSquare, href: '/speaking', color: 'bg-teal-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {t('dashboard.welcome', uiLanguage)}, {profile.displayName}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            {t('common.level', uiLanguage)}: <LevelBadge level={profile.currentLevel} /> &middot;
            {' '}{profile.xp} XP
          </p>
        </div>
        {!profile.placementTestCompleted && (
          <Link
            href="/placement-test"
            className="mt-4 sm:mt-0 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center gap-2"
          >
            Take Placement Test <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.streak}</div>
          <div className="text-sm text-gray-500">{t('common.streak', uiLanguage)}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.xp}</div>
          <div className="text-sm text-gray-500">XP</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.wordsLearned}</div>
          <div className="text-sm text-gray-500">{t('common.wordsLearned', uiLanguage)}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-800">{profile.lessonsCompleted}</div>
          <div className="text-sm text-gray-500">{t('common.lessonsCompleted', uiLanguage)}</div>
        </div>
      </div>

      {/* Skills Grid */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">{t('dashboard.continueLesson', uiLanguage)}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {skills.map((skill) => {
          const score = profile.skillScores[skill.key as keyof typeof profile.skillScores] || 0;
          return (
            <Link
              key={skill.key}
              href={skill.href}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${skill.color} rounded-xl flex items-center justify-center`}>
                  <skill.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {skill.label}
                </h3>
              </div>
              <ProgressBar current={score} total={100} />
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">{score}%</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">{t('dashboard.reviewDue', uiLanguage)}</h3>
          <p className="text-white/70 text-sm mb-4">Review vocabulary words due today using spaced repetition.</p>
          <Link
            href="/vocabulary?mode=review"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition"
          >
            {t('common.review', uiLanguage)} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">{t('dashboard.todayGoal', uiLanguage)}</h3>
          <p className="text-white/70 text-sm mb-4">Complete at least one lesson and review 10 words to maintain your streak!</p>
          <div className="flex items-center gap-3">
            <ProgressBar current={0} total={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
