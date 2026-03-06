'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { getVocabularyByLevel } from '@/content/vocabulary';
import { getGrammarLessonsByLevel } from '@/content/grammar-lessons';
import { getReadingPassagesByLevel } from '@/content/reading-passages';
import {
  BookOpen, Brain, BookOpenCheck, Headphones, PenTool, MessageSquare,
  CheckCircle2, Circle, ArrowRight, Sparkles, TrendingUp, Lock,
} from 'lucide-react';
import type { CEFRLevel, SkillType, UserProfile } from '@/lib/firestore';

// ─── Level descriptors ───────────────────────────────────────────────────
const levelInfo: Record<CEFRLevel, { name: string; description: string }> = {
  A1: { name: 'Beginner', description: 'Basic words, simple sentences, introductions' },
  A2: { name: 'Elementary', description: 'Everyday topics, short conversations, simple texts' },
  B1: { name: 'Intermediate', description: 'Opinions, plans, connected paragraphs' },
  B2: { name: 'Upper Intermediate', description: 'Abstract topics, fluent discussions, detailed texts' },
  C1: { name: 'Advanced', description: 'Complex texts, nuanced arguments, flexible language' },
  C2: { name: 'Mastery', description: 'Near-native fluency, subtle nuances, academic proficiency' },
};

const allLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// ─── Skill milestones per level ──────────────────────────────────────────
interface SkillMilestone {
  key: SkillType;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  href: string;
  /** Compute the target count for this level */
  getTarget: (level: CEFRLevel) => number;
  /** Compute the student's current count for this level */
  getCurrent: (level: CEFRLevel, profile: UserProfile) => number;
  /** Label shown with the numbers */
  unit: string;
}

// ─── Study plan logic ────────────────────────────────────────────────────

/** Minimum average skill score to be considered "ready" to move up */
const LEVEL_UP_THRESHOLD = 60;

/** Whether the student meets all milestones for a level */
function isLevelComplete(
  milestones: SkillMilestone[],
  level: CEFRLevel,
  profile: UserProfile
): boolean {
  return milestones.every((m) => m.getCurrent(level, profile) >= m.getTarget(level));
}

/** Overall readiness percentage for a level (average across milestones) */
function levelReadiness(
  milestones: SkillMilestone[],
  level: CEFRLevel,
  profile: UserProfile
): number {
  if (milestones.length === 0) return 0;
  const sum = milestones.reduce((acc, m) => {
    const target = m.getTarget(level);
    if (target === 0) return acc + 100;
    return acc + Math.min(100, Math.round((m.getCurrent(level, profile) / target) * 100));
  }, 0);
  return Math.round(sum / milestones.length);
}

// ─── Component ───────────────────────────────────────────────────────────
export default function StudyPlan() {
  const { profile } = useAppStore();
  if (!profile) return null;

  const currentLevel = profile.currentLevel ?? 'A1';
  const currentIdx = allLevels.indexOf(currentLevel);

  // Build milestones based on available content
  const milestones: SkillMilestone[] = useMemo(
    () => [
      {
        key: 'vocabulary',
        label: 'Vocabulary',
        icon: BookOpen,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        href: '/vocabulary',
        unit: 'words reviewed',
        getTarget: (level) => {
          const count = getVocabularyByLevel(level).length;
          // Target: review at least 80% of words at this level
          return Math.ceil(count * 0.8);
        },
        getCurrent: (_level, p) => p.wordsLearned,
      },
      {
        key: 'grammar',
        label: 'Grammar',
        icon: Brain,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
        href: '/grammar',
        unit: 'lessons completed',
        getTarget: (level) => getGrammarLessonsByLevel(level).length,
        getCurrent: (_level, p) => p.lessonsCompleted,
      },
      {
        key: 'reading',
        label: 'Reading',
        icon: BookOpenCheck,
        color: 'text-green-600',
        bg: 'bg-green-100',
        href: '/reading',
        unit: 'passages read',
        getTarget: (level) => getReadingPassagesByLevel(level).length,
        getCurrent: (_level, p) => Math.round(p.skillScores.reading / 10), // approximate
      },
      {
        key: 'listening',
        label: 'Listening',
        icon: Headphones,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        href: '/listening',
        unit: 'score',
        getTarget: () => LEVEL_UP_THRESHOLD,
        getCurrent: (_level, p) => p.skillScores.listening,
      },
      {
        key: 'writing',
        label: 'Writing',
        icon: PenTool,
        color: 'text-pink-600',
        bg: 'bg-pink-100',
        href: '/writing',
        unit: 'score',
        getTarget: () => LEVEL_UP_THRESHOLD,
        getCurrent: (_level, p) => p.skillScores.writing,
      },
      {
        key: 'speaking',
        label: 'Speaking',
        icon: MessageSquare,
        color: 'text-teal-600',
        bg: 'bg-teal-100',
        href: '/speaking',
        unit: 'score',
        getTarget: () => LEVEL_UP_THRESHOLD,
        getCurrent: (_level, p) => p.skillScores.speaking,
      },
    ],
    []
  );

  const readiness = levelReadiness(milestones, currentLevel, profile);
  const avgSkill = Math.round(
    Object.values(profile.skillScores).reduce((a, b) => a + b, 0) /
      Object.values(profile.skillScores).length
  );
  const readyToLevelUp = readiness >= 80 && avgSkill >= LEVEL_UP_THRESHOLD && currentIdx < allLevels.length - 1;
  const nextLevel = allLevels[currentIdx + 1] as CEFRLevel | undefined;

  // Find the weakest skill to suggest
  const weakestSkill = milestones.reduce((weakest, m) => {
    const pct = m.getTarget(currentLevel) === 0
      ? 100
      : Math.round((m.getCurrent(currentLevel, profile) / m.getTarget(currentLevel)) * 100);
    const weakestPct = weakest.getTarget(currentLevel) === 0
      ? 100
      : Math.round((weakest.getCurrent(currentLevel, profile) / weakest.getTarget(currentLevel)) * 100);
    return pct < weakestPct ? m : weakest;
  }, milestones[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white">
        <div className="flex items-center gap-3 mb-1">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-bold">Your Study Plan</h2>
        </div>
        <p className="text-white/80 text-sm">
          {currentLevel === 'C2'
            ? 'You\'ve reached the highest level — keep perfecting your skills!'
            : `Complete skills at ${currentLevel} to unlock ${nextLevel}`}
        </p>
      </div>

      {/* Level roadmap */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-1 overflow-x-auto">
          {allLevels.map((level, idx) => {
            const isActive = level === currentLevel;
            const isDone = idx < currentIdx;
            const isLocked = idx > currentIdx;
            return (
              <div key={level} className="flex items-center">
                {idx > 0 && (
                  <div
                    className={`w-6 sm:w-10 h-0.5 ${isDone ? 'bg-green-400' : isActive ? 'bg-indigo-300' : 'bg-gray-200'}`}
                  />
                )}
                <div
                  className={`flex flex-col items-center px-2 py-1 rounded-lg transition-all ${
                    isActive
                      ? 'bg-indigo-50 ring-2 ring-indigo-400 scale-105'
                      : isDone
                      ? 'opacity-70'
                      : 'opacity-40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDone
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : isLocked ? <Lock className="w-3 h-3" /> : level}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-indigo-700' : isDone ? 'text-green-700' : 'text-gray-400'}`}>
                    {level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current level info */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-800">
              Level {currentLevel}: {levelInfo[currentLevel].name}
            </h3>
            <p className="text-sm text-gray-500">{levelInfo[currentLevel].description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">{readiness}%</div>
            <div className="text-xs text-gray-400">complete</div>
          </div>
        </div>
        {/* Overall progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-700 ${
              readiness >= 80 ? 'bg-green-500' : readiness >= 40 ? 'bg-indigo-500' : 'bg-amber-500'
            }`}
            style={{ width: `${readiness}%` }}
          />
        </div>
      </div>

      {/* Skill checklist */}
      <div className="px-6 py-4 space-y-3">
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Skills checklist</h4>
        {milestones.map((m) => {
          const target = m.getTarget(currentLevel);
          const current = Math.min(m.getCurrent(currentLevel, profile), target);
          const pct = target === 0 ? 100 : Math.min(100, Math.round((current / target) * 100));
          const done = pct >= 100;
          const Icon = m.icon;
          return (
            <Link
              key={m.key}
              href={m.href}
              className="flex items-center gap-3 group py-2 px-3 -mx-3 rounded-xl hover:bg-gray-50 transition"
            >
              <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    {m.label}
                  </span>
                  <span className={`text-xs font-medium ${done ? 'text-green-600' : 'text-gray-400'}`}>
                    {done ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                    ) : (
                      `${pct}%`
                    )}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      done ? 'bg-green-500' : 'bg-indigo-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {current} / {target} {m.unit}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Recommendation / Level-up prompt */}
      <div className="px-6 py-4 border-t border-gray-100">
        {readyToLevelUp && nextLevel ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-800">Ready to level up! 🎉</h4>
                <p className="text-sm text-green-700 mt-1">
                  You&apos;ve built a strong foundation at {currentLevel}. Start exploring{' '}
                  <span className="font-bold">{nextLevel} ({levelInfo[nextLevel].name})</span> content
                  — {levelInfo[nextLevel].description.toLowerCase()}.
                </p>
                <Link
                  href="/tests"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                  Take a level test <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-indigo-800">Today&apos;s recommendation</h4>
                <p className="text-sm text-indigo-700 mt-1">
                  Focus on <span className="font-bold">{weakestSkill.label}</span> — it&apos;s your
                  biggest growth area right now. Practice regularly and you&apos;ll be
                  ready for {nextLevel || 'mastery'} soon!
                </p>
                <Link
                  href={weakestSkill.href}
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Practice {weakestSkill.label} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
