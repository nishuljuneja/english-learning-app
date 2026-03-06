'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LANGUAGES } from '@/lib/i18n';
import { BookOpen, Brain, Headphones, MessageSquare, Zap, Globe } from 'lucide-react';

export default function Home() {
  const { uiLanguage, setUILanguage, user } = useAppStore();

  const features = [
    {
      icon: BookOpen,
      title: 'Oxford 5000 Vocabulary',
      description: 'Learn the most important 5000 English words with spaced repetition, organized by your proficiency level.',
    },
    {
      icon: Brain,
      title: 'Grammar Made Simple',
      description: 'Clear explanations with Indian English examples. We address the specific mistakes Indian speakers commonly make.',
    },
    {
      icon: Headphones,
      title: 'Reading & Listening',
      description: 'Graded passages set in Indian contexts — from local markets to startup ecosystems.',
    },
    {
      icon: MessageSquare,
      title: 'AI Conversation Practice',
      description: 'Practice speaking English with an AI partner tuned to your level. No judgment, unlimited patience.',
    },
    {
      icon: Globe,
      title: '10 Indian Languages',
      description: 'Instructions in Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, and Odia.',
    },
    {
      icon: Zap,
      title: 'Adaptive Learning',
      description: 'Our system tracks your strengths and weaknesses across skills, adjusting difficulty automatically.',
    },
  ];

  const levels = [
    { id: 'A1', color: 'from-emerald-400 to-emerald-600' },
    { id: 'A2', color: 'from-green-400 to-green-600' },
    { id: 'B1', color: 'from-blue-400 to-blue-600' },
    { id: 'B2', color: 'from-purple-400 to-purple-600' },
    { id: 'C1', color: 'from-orange-400 to-orange-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
              Built for India&apos;s English learners
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              {t('hero.title', uiLanguage)}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle', uiLanguage)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={user ? '/dashboard' : '/signup'}
                className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                {t('hero.cta', uiLanguage)}
              </Link>
              <Link
                href="/placement-test"
                className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
              >
                {t('placement.title', uiLanguage)}
              </Link>
            </div>
            {/* Quick language selector */}
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {LANGUAGES.filter(l => l.code !== 'en').map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setUILanguage(lang.code)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    uiLanguage === lang.code
                      ? 'bg-white text-indigo-700 font-medium'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEFR Levels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">5 Levels, One Clear Path</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Based on the internationally recognised CEFR framework. Take a diagnostic test to find your starting point.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {levels.map((level) => (
              <div key={level.id} className={`bg-gradient-to-br ${level.color} rounded-2xl p-6 text-white text-center shadow-lg hover:scale-105 transition-transform cursor-pointer`}>
                <div className="text-3xl font-black mb-2">{level.id}</div>
                <div className="text-sm font-medium opacity-90">{t(`level.${level.id}`, uiLanguage)}</div>
                <div className="text-xs opacity-70 mt-1">{t(`level.${level.id}.desc`, uiLanguage)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Everything you need to master English</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Built for India */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why &ldquo;Built for India&rdquo;?</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <h3 className="font-semibold text-amber-800 mb-2">🎯 Common Mistakes Addressed</h3>
              <p className="text-sm text-amber-700">We specifically target errors Indian English speakers make — article usage, present perfect overuse, subject-verb agreement, and preposition confusion.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">🏏 Indian Context Examples</h3>
              <p className="text-sm text-blue-700">All examples use familiar Indian names, places, food, and situations — from cricket to chai, from IT companies to railway journeys.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-2">🗣️ Your Language Support</h3>
              <p className="text-sm text-green-700">Instructions and translations in 10 Indian languages. At beginner levels, everything is explained in your mother tongue.</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <h3 className="font-semibold text-purple-800 mb-2">💼 Career-Focused</h3>
              <p className="text-sm text-purple-700">Special content for job interviews, business emails, presentations, and professional communication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to improve your English?</h2>
          <p className="text-indigo-200 mb-8">Take a free diagnostic test to find your level. No sign-up required.</p>
          <Link href="/placement-test" className="inline-block px-8 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Start Diagnostic Test →
          </Link>
        </div>
      </section>
    </div>
  );
}
