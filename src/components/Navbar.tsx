'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { LANGUAGES } from '@/lib/i18n';
import {
  Trophy, Home, User, Globe, ChevronDown, ClipboardCheck,
  Award, Gamepad2, GraduationCap, Crown,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { user, profile, uiLanguage, setUILanguage } = useAppStore();
  const pathname = usePathname();
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
    { href: '/learning', label: 'Learning', icon: GraduationCap },
    { href: '/tests', label: 'Tests', icon: ClipboardCheck },
    { href: '/games', label: 'Games', icon: Gamepad2 },
    { href: '/achievements', label: 'Achievements', icon: Award },
    { href: '/leaderboard', label: t('nav.leaderboard', uiLanguage), icon: Trophy },
    { href: '/pricing', label: 'Pricing', icon: Crown },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">SpeakEasy</span>
            </Link>
          </div>

          {/* Nav Dropdown — visible on all screens */}
          {user && (() => {
            const currentItem = navItems.find((item) => pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))) || navItems[0];
            const CurrentIcon = currentItem.icon;
            return (
              <div className="flex items-center" ref={navDropdownRef}>
                <div className="relative">
                  <button
                    onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    <CurrentIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{currentItem.label}</span>
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
          <div className="flex items-center space-x-2 sm:space-x-3">
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
              <Link href="/profile" className="text-gray-600 hover:text-indigo-600">
                <User className="w-5 h-5" />
              </Link>
            )}

            {!user && (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-indigo-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  {t('common.login', uiLanguage)}
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
                >
                  {t('common.signup', uiLanguage)}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
