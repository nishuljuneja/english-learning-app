'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t, LANGUAGES } from '@/lib/i18n';
import { logOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { User, Trophy, BookOpen, Target, Calendar, Medal, Settings, LogOut, Globe, Flame } from 'lucide-react';
import { LevelBadge } from '@/components/Exercises';
import type { CEFRLevel } from '@/lib/firestore';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, uiLanguage, setUILanguage } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    await logOut();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">You&apos;re not logged in</h2>
        <p className="text-gray-500 mb-6">Log in or sign up to track your progress and earn achievements.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => router.push('/login')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
            {t('auth.login', uiLanguage)}
          </button>
          <button onClick={() => router.push('/signup')} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
            {t('auth.signup', uiLanguage)}
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Flame, label: 'Streak', value: `${profile?.streak || 0} days`, color: 'text-orange-500' },
    { icon: Trophy, label: 'XP', value: profile?.xp || 0, color: 'text-yellow-500' },
    { icon: BookOpen, label: 'Words Learned', value: profile?.wordsLearned || 0, color: 'text-blue-500' },
    { icon: Target, label: 'Lessons Done', value: profile?.lessonsCompleted || 0, color: 'text-green-500' },
  ];

  const skillColors: Record<string, string> = {
    grammar: 'bg-purple-100 text-purple-700',
    vocabulary: 'bg-blue-100 text-blue-700',
    reading: 'bg-green-100 text-green-700',
    listening: 'bg-yellow-100 text-yellow-700',
    speaking: 'bg-red-100 text-red-700',
    writing: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
            {(profile?.displayName || user.email || 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{profile?.displayName || 'Learner'}</h1>
            <p className="text-white/70 text-sm">{user.email}</p>
            <div className="flex items-center gap-3 mt-2">
              {profile?.currentLevel && <LevelBadge level={profile.currentLevel} />}
              <span className="text-sm text-white/60">
                Joined {profile?.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'recently'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
          <h3 className="font-bold text-gray-800">Settings</h3>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              <Globe className="w-4 h-4 inline mr-1" /> {t('nav.language', uiLanguage)}
            </label>
            <select
              value={uiLanguage}
              onChange={(e) => setUILanguage(e.target.value as any)}
              className="w-full px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Skill Levels</h3>
        <div className="space-y-3">
          {profile?.skillScores && Object.entries(profile.skillScores).map(([skill, data]) => (
            <div key={skill} className="flex items-center gap-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-lg capitalize ${skillColors[skill] || 'bg-gray-100 text-gray-600'}`}>
                {skill}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${typeof data === 'number' ? data : 0}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600 w-8 text-right">
                {typeof data === 'number' ? data : 0}%
              </span>
            </div>
          ))}
          {(!profile?.skillScores || Object.keys(profile.skillScores).length === 0) && (
            <p className="text-gray-400 text-sm">Complete lessons to build your skill profile.</p>
          )}
        </div>
      </div>

      {/* Achievements placeholder */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Medal className="w-5 h-5 text-yellow-500" /> Achievements
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { emoji: '🎯', name: 'First Lesson', desc: 'Complete your first lesson' },
            { emoji: '🔥', name: '7-Day Streak', desc: 'Practice 7 days in a row' },
            { emoji: '📚', name: '100 Words', desc: 'Learn 100 vocabulary words' },
            { emoji: '🏆', name: 'Level Up', desc: 'Advance to the next CEFR level' },
            { emoji: '🌟', name: 'Perfect Score', desc: 'Score 100% on any quiz' },
            { emoji: '💪', name: 'Grammar Master', desc: 'Complete all grammar lessons' },
            { emoji: '📖', name: 'Bookworm', desc: 'Read 10 passages' },
            { emoji: '🗣️', name: 'Fluent Speaker', desc: 'Complete a speaking exercise' },
          ].map((a) => (
            <div key={a.name} className="bg-gray-50 rounded-xl p-3 text-center opacity-40">
              <span className="text-2xl">{a.emoji}</span>
              <p className="text-xs font-medium text-gray-600 mt-1">{a.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
