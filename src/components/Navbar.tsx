'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LANGUAGES } from '@/lib/i18n';
import { logOut } from '@/lib/auth';
import {
  BookOpen, Brain, Headphones, MessageSquare, PenTool, Trophy,
  Home, User, Menu, X, Globe, LogOut, Flame, TrendingUp, ChevronDown, ClipboardCheck,
  Sparkles, Award, BarChart3,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import { NotificationSettingsButton } from '@/components/NotificationPrompt';

export default function Navbar() {
  const { user, profile, uiLanguage, setUILanguage } = useAppStore();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navDropdownRef.current && !navDropdownRef.current.contains(e.target as Node)) {
        setNavDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { href: '/dashboard', label: t('nav.dashboard', uiLanguage), icon: Home },
    { href: '/daily-practice', label: 'Daily Practice', icon: Sparkles },
    { href: '/vocabulary', label: t('nav.vocabulary', uiLanguage), icon: BookOpen },
    { href: '/grammar', label: t('nav.grammar', uiLanguage), icon: Brain },
    { href: '/reading', label: t('nav.reading', uiLanguage), icon: BookOpen },
    { href: '/listening', label: t('nav.listening', uiLanguage), icon: Headphones },
    { href: '/speaking', label: t('nav.speaking', uiLanguage), icon: MessageSquare },
    { href: '/writing', label: t('nav.writing', uiLanguage), icon: PenTool },
    { href: '/tests', label: 'Tests', icon: ClipboardCheck },
    { href: '/achievements', label: 'Achievements', icon: Award },
    { href: '/leaderboard', label: t('nav.leaderboard', uiLanguage), icon: Trophy },
    { href: '/analytics', label: 'Weak Areas', icon: BarChart3 },
    { href: '/progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">🇮🇳 SpeakEasy</span>
            </Link>
          </div>

          {/* Desktop Nav Dropdown */}
          {user && (() => {
            const currentItem = navItems.find((item) => pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) || navItems[0];
            const CurrentIcon = currentItem.icon;
            return (
              <div className="hidden md:flex items-center" ref={navDropdownRef}>
                <div className="relative">
                  <button
                    onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    <CurrentIcon className="w-4 h-4" />
                    {currentItem.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${navDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {navDropdownOpen && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      {navItems.filter((item) => item.href !== currentItem.href).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setNavDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

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

                {/* Notification Settings */}
                <NotificationSettingsButton />

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
          </div>
        </div>
      )}
    </nav>
  );
}
