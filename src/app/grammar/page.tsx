'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { grammarLessons, getGrammarLessonsByLevel } from '@/content/grammar-lessons';
import { LevelBadge } from '@/components/Exercises';
import { Brain, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import type { CEFRLevel } from '@/lib/firestore';
import { isLevelAccessible } from '@/lib/subscription';
import ProGate from '@/components/ProGate';

export default function GrammarPage() {
  const { profile, uiLanguage } = useAppStore();
  const currentLevel = profile?.currentLevel || 'A1';

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('nav.grammar', uiLanguage)}</h1>
          <p className="text-gray-500 text-sm">Master English grammar step by step</p>
        </div>
      </div>

      {levels.map((level) => {
        const lessons = getGrammarLessonsByLevel(level);

        if (lessons.length === 0) return null;

        const locked = !isLevelAccessible(level, profile);

        return (
          <div key={level} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <LevelBadge level={level} />
              <h2 className="text-lg font-semibold text-gray-700">
                {t(`level.${level}`, uiLanguage)}
              </h2>
              {locked && <Lock className="w-4 h-4 text-gray-400" />}
            </div>

            {locked ? (
              <ProGate feature={`${level} Grammar`} compact />
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson) => {
                  const title = lesson.titleTranslations[uiLanguage] || lesson.title;
                  const desc = lesson.descriptionTranslations[uiLanguage] || lesson.description;

                  return (
                    <Link
                      key={lesson.id}
                      href={`/grammar/${lesson.id}`}
                      className="block bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md cursor-pointer transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{desc}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xs text-gray-400">
                            {lesson.exercises.length} {t('common.exercise', uiLanguage).toLowerCase()}s
                          </span>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
