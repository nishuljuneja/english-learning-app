'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LANGUAGES } from '@/lib/i18n';
import { logOut } from '@/lib/auth';
import {
  BookOpen, Brain, Headphones, MessageSquare, PenTool, Trophy,
  Home, User, Menu, X, Globe, LogOut, Flame, TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, profile, uiLanguage, setUILanguage } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: t('nav.dashboard', uiLanguage), icon: Home },
    { href: '/vocabulary', label: t('nav.vocabulary', uiLanguage), icon: BookOpen },
    { href: '/grammar', label: t('nav.grammar', uiLanguage), icon: Brain },
    { href: '/reading', label: t('nav.reading', uiLanguage), icon: BookOpen },
    { href: '/listening', label: t('nav.listening', uiLanguage), icon: Headphones },
    { href: '/speaking', label: t('nav.speaking', uiLanguage), icon: MessageSquare },
    { href: '/writing', label: t('nav.writing', uiLanguage), icon: PenTool },
    { href: '/progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">🇮🇳 EngLearn</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {user && navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <item.icon className="w-4 h-4 inline mr-1" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 px-2 py-1 rounded-md text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {LANGUAGES.find((l) => l.code === uiLanguage)?.nativeName || 'English'}
                </span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-y-auto z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setUILanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 ${
                        uiLanguage === lang.code ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {lang.nativeName} ({lang.name})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user && profile && (
              <>
                {/* Streak */}
                <div className="flex items-center text-orange-500 text-sm font-medium">
                  <Flame className="w-4 h-4 mr-1" />
                  {profile.streak}
                </div>

                {/* XP */}
                <div className="text-sm font-medium text-indigo-600">
                  {profile.xp} XP
                </div>

                {/* Level Badge */}
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">
                  {profile.currentLevel}
                </span>

                {/* Profile & Logout */}
                <Link href="/profile" className="text-gray-600 hover:text-indigo-600">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => logOut()}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title={t('common.logout', uiLanguage)}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            {!user && (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                >
                  {t('common.login', uiLanguage)}
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  {t('common.signup', uiLanguage)}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {user && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4 inline mr-2" />
                {item.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/leaderboard"
                className="block text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Trophy className="w-4 h-4 inline mr-2" />
                {t('nav.leaderboard', uiLanguage)}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
