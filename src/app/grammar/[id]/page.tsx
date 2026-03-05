'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { getGrammarLessonById } from '@/content/grammar-lessons';
import { MultipleChoice, FillBlank, ScoreCard, ProgressBar } from '@/components/Exercises';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function GrammarLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { uiLanguage } = useAppStore();
  const lessonId = params.id as string;
  const lesson = getGrammarLessonById(lessonId);

  const [phase, setPhase] = useState<'learn' | 'practice' | 'result'>('learn');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
        <Link href="/grammar" className="text-indigo-600 hover:underline">← Back to Grammar</Link>
      </div>
    );
  }

  const title = lesson.titleTranslations[uiLanguage] || lesson.title;
  const exercises = lesson.exercises;
  const currentExercise = exercises[exerciseIndex];

  // Learn Phase - Show explanation
  if (phase === 'learn') {
    const explanation = lesson.content.explanationTranslations[uiLanguage] || lesson.content.explanation;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/grammar" className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Grammar
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-600 uppercase">{lesson.level} Grammar</span>
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            </div>
          </div>

          {/* Main Explanation */}
          <div className="prose prose-indigo max-w-none mb-8">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{explanation}</div>
          </div>

          {/* Examples */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Examples</h3>
            <div className="space-y-3">
              {lesson.content.examples.map((ex, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-800 font-medium">
                    {ex.english.split(ex.highlight).map((part, j, arr) => (
                      <span key={j}>
                        {part}
                        {j < arr.length - 1 && (
                          <span className="bg-yellow-200 px-1 rounded font-bold">{ex.highlight}</span>
                        )}
                      </span>
                    ))}
                  </p>
                  {ex.translations[uiLanguage] && (
                    <p className="text-sm text-gray-500 mt-1">→ {ex.translations[uiLanguage]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {lesson.content.tips.length > 0 && (
            <div className="mb-8">
              {lesson.content.tips.map((tip, i) => {
                const tipText = tip.translations[uiLanguage] || tip.text;
                return (
                  <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    {tipText}
                  </div>
                );
              })}
            </div>
          )}

          {/* Start Practice Button */}
          <button
            onClick={() => setPhase('practice')}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
          >
            {t('common.practice', uiLanguage)} ({exercises.length} questions) →
          </button>
        </div>
      </div>
    );
  }

  // Practice Phase
  if (phase === 'practice' && currentExercise) {
    const explanation = currentExercise.explanationTranslations[uiLanguage] || currentExercise.explanation;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {t('common.exercise', uiLanguage)} {exerciseIndex + 1} / {exercises.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">{title}</span>
          </div>
          <ProgressBar current={exerciseIndex + 1} total={exercises.length} />
        </div>

        {currentExercise.type === 'multiple-choice' && currentExercise.options && (
          <MultipleChoice
            key={currentExercise.id}
            question={currentExercise.question}
            options={currentExercise.options}
            correctAnswer={currentExercise.correctAnswer as string}
            explanation={explanation}
            onAnswer={(correct) => {
              if (correct) setScore(score + 1);
              setTimeout(() => {
                if (exerciseIndex < exercises.length - 1) {
                  setExerciseIndex(exerciseIndex + 1);
                } else {
                  setPhase('result');
                }
              }, 2000);
            }}
          />
        )}

        {currentExercise.type === 'fill-blank' && (
          <FillBlank
            key={currentExercise.id}
            question={currentExercise.question}
            correctAnswer={currentExercise.correctAnswer as string}
            explanation={explanation}
            onAnswer={(correct) => {
              if (correct) setScore(score + 1);
              setTimeout(() => {
                if (exerciseIndex < exercises.length - 1) {
                  setExerciseIndex(exerciseIndex + 1);
                } else {
                  setPhase('result');
                }
              }, 2000);
            }}
          />
        )}

        {(currentExercise.type === 'correct-error' || currentExercise.type === 'reorder') && (
          <FillBlank
            key={currentExercise.id}
            question={currentExercise.question}
            correctAnswer={currentExercise.correctAnswer as string}
            explanation={explanation}
            onAnswer={(correct) => {
              if (correct) setScore(score + 1);
              setTimeout(() => {
                if (exerciseIndex < exercises.length - 1) {
                  setExerciseIndex(exerciseIndex + 1);
                } else {
                  setPhase('result');
                }
              }, 2000);
            }}
          />
        )}
      </div>
    );
  }

  // Result Phase
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <ScoreCard
        score={score}
        total={exercises.length}
        onRetry={() => {
          setPhase('learn');
          setExerciseIndex(0);
          setScore(0);
        }}
        onContinue={() => router.push('/grammar')}
      />
    </div>
  );
}
