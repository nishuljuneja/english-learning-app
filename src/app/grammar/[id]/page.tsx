'use client';

import { useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { getGrammarLessonById } from '@/content/grammar-lessons';
import { MultipleChoice, FillBlank, ScoreCard, ProgressBar } from '@/components/Exercises';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { updateUserProfile, addXP, saveLessonProgress, updateStreak } from '@/lib/firestore';

/** Fisher-Yates shuffle returning a new array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const EXERCISES_PER_ROUND = 4;

export default function GrammarLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { uiLanguage, profile, setProfile } = useAppStore();
  const lessonId = params.id as string;
  const lesson = getGrammarLessonById(lessonId);

  const allExercises = lesson?.exercises ?? [];

  const [phase, setPhase] = useState<'learn' | 'practice' | 'result'>('learn');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  // Seed for shuffling — changes each "New Questions" click
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Pick & shuffle a subset of exercises each round
  // Re-calculated when shuffleSeed changes (new practice) or lesson changes
  const roundExercises = useMemo(() => {
    const shuffled = shuffle(allExercises);
    return shuffled.slice(0, Math.min(EXERCISES_PER_ROUND, shuffled.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, shuffleSeed, allExercises.length]);

  // Advance to next exercise (called by the user via Next button)
  // MUST be declared before any conditional returns (Rules of Hooks)
  const advanceExercise = useCallback(() => {
    setAnswered(false);
    if (exerciseIndex < roundExercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      setPhase('result');
      // Persist progress
      if (profile) {
        const pct = Math.round((score / roundExercises.length) * 100);
        const newGrammarScore = Math.max(profile.skillScores.grammar, pct);
        const updates = {
          lessonsCompleted: profile.lessonsCompleted + 1,
          skillScores: { ...profile.skillScores, grammar: newGrammarScore },
        };
        updateUserProfile(profile.uid, updates).catch(() => {});
        addXP(profile.uid, score * 10).catch(() => {});
        updateStreak(profile.uid).catch(() => {});
        saveLessonProgress(profile.uid, {
          lessonId: lessonId,
          lessonType: 'grammar',
          userId: profile.uid,
          score: pct,
          timeSpentSeconds: 0,
          attempts: 1,
          bestScore: pct,
          completed: pct >= 70,
        }).catch(() => {});
        // Update local store immediately
        setProfile({ ...profile, ...updates, xp: profile.xp + score * 10 });
      }
    }
  }, [exerciseIndex, roundExercises.length, score, profile, lessonId, setProfile]);

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson not found</h1>
        <Link href="/grammar" className="text-indigo-600 hover:underline">← Back to Grammar</Link>
      </div>
    );
  }

  const title = lesson.titleTranslations[uiLanguage] || lesson.title;
  const currentExercise = roundExercises[exerciseIndex];

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
            {t('common.practice', uiLanguage)} ({roundExercises.length} questions) →
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
              {t('common.exercise', uiLanguage)} {exerciseIndex + 1} / {roundExercises.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">{title}</span>
          </div>
          <ProgressBar current={exerciseIndex + 1} total={roundExercises.length} />
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
              setAnswered(true);
            }}
            onNext={advanceExercise}
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
              setAnswered(true);
            }}
            onNext={advanceExercise}
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
              setAnswered(true);
            }}
            onNext={advanceExercise}
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
        total={roundExercises.length}
        onRetry={() => {
          setPhase('practice');
          setExerciseIndex(0);
          setScore(0);
        }}
        onNewPractice={
          allExercises.length > EXERCISES_PER_ROUND
            ? () => {
                setShuffleSeed((s) => s + 1);
                setPhase('practice');
                setExerciseIndex(0);
                setScore(0);
              }
            : undefined
        }
        onContinue={() => router.push('/grammar')}
      />
    </div>
  );
}
