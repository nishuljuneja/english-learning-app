'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LevelBadge, ProgressBar } from '@/components/Exercises';
import { BookOpen, Brain, Headphones, MessageSquare, PenTool, Flame, Trophy, ArrowRight, ClipboardCheck, Sparkles, Award, BarChart3, Gamepad2, LetterText, Skull, Shuffle, Layers, Crown, Lock } from 'lucide-react';
import { isPro } from '@/lib/subscription';
import StudyPlan from '@/components/StudyPlan';

export default function DashboardPage() {
  const { profile, uiLanguage, loading, refreshProfile } = useAppStore();

  // Always re-fetch fresh profile from Firestore when dashboard mounts
  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

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
            Take Diagnostic Test <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Upgrade Banner for free users */}
      {!isPro(profile) && (
        <Link
          href="/pricing"
          className="block mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-5 text-white hover:shadow-xl transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  Upgrade to Pro
                  <span className="text-xs font-medium bg-yellow-400/20 text-yellow-200 px-2 py-0.5 rounded-full">₹499/yr</span>
                </h3>
                <p className="text-white/70 text-sm">Unlock all levels (B1–C2), Reading, Listening, unlimited practice & more</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      )}

      {/* Games Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {/* Unjumble */}
        <Link
          href="/games/word-puzzle"
          className="group bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <LetterText className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Unjumble</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">Make a 7 letter word</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition">
            Play <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>

        {/* Hangman */}
        <Link
          href="/games/hangman"
          className="group bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center shadow-sm">
              <Skull className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Hangman</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">Guess the word letter by letter</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-rose-600 group-hover:text-rose-800 transition">
            Play <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>

        {/* Scramble */}
        <Link
          href="/games/sentence-scramble"
          className="group bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <Shuffle className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Scramble</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">Reorder words to build sentences</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 group-hover:text-cyan-800 transition">
            Play <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>

        {/* Pairs */}
        <Link
          href="/games/word-match"
          className="group bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-800">Pairs</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">Match words with their definitions</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:text-emerald-800 transition">
            Play <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
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

      {/* Daily Practice CTA */}
      <Link
        href="/daily-practice"
        className="block mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white hover:shadow-lg transition-shadow group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Daily Practice</h3>
              <p className="text-white/70 text-sm">Quick 5-minute mixed session — vocab, grammar & reading</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </div>
      </Link>

      {/* Skills Grid (Continue Learning) */}
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

      {/* Study Plan */}
      <div className="mb-8">
        <StudyPlan />
      </div>

      {/* Progress CTA */}
      <Link
        href="/progress"
        className="block mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">View Your Full Progress</h3>
              <p className="text-sm text-gray-500">See skills breakdown, milestones, and more</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
        </div>
      </Link>

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

      {/* Tests Section */}
      <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Track Your Progress with Tests</h3>
              <p className="text-sm text-gray-500 mt-1">
                Take a quick test to see how your English level has improved over time. Compare results and spot trends.
              </p>
            </div>
          </div>
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors whitespace-nowrap"
          >
            Take a Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Achievements & Analytics Row */}
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Link
          href="/achievements"
          className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">Achievements</h3>
              <p className="text-sm text-gray-500">Earn badges for your milestones</p>
            </div>
          </div>
        </Link>
        <Link
          href="/analytics"
          className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-5 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">Growth Areas</h3>
              <p className="text-sm text-gray-500">See personalized insights & tips</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
