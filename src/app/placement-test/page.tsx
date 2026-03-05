'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { placementQuestions, calculatePlacementLevel } from '@/content/placement-test';
import { MultipleChoice, ScoreCard, ProgressBar, LevelBadge } from '@/components/Exercises';
import { savePlacementResult, updateUserProfile } from '@/lib/firestore';
import { Timestamp } from 'firebase/firestore';
import { ArrowRight, SkipForward } from 'lucide-react';
import Link from 'next/link';

export default function PlacementTestPage() {
  const { user, profile, uiLanguage, setProfile } = useAppStore();
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; answer: string; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const [assignedLevel, setAssignedLevel] = useState<string | null>(null);

  const totalQuestions = placementQuestions.length;
  const currentQuestion = placementQuestions[currentIndex];

  const handleAnswer = (correct: boolean) => {
    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        answer: correct ? currentQuestion.correctAnswer : 'wrong',
        correct,
      },
    ];
    setAnswers(newAnswers);

    // Auto advance after 1.5 seconds
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        finishTest(newAnswers);
      }
    }, 1500);
  };

  const handleSkip = () => {
    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, answer: 'skipped', correct: false },
    ];
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = async (finalAnswers: typeof answers) => {
    const level = calculatePlacementLevel(finalAnswers);
    setAssignedLevel(level);
    setFinished(true);

    // Save to Firestore if logged in
    if (user) {
      try {
        await savePlacementResult({
          userId: user.uid,
          answers: finalAnswers,
          score: finalAnswers.filter((a) => a.correct).length,
          assignedLevel: level,
          completedAt: Timestamp.now(),
        });
        // Update local state
        if (profile) {
          setProfile({ ...profile, currentLevel: level, placementTestCompleted: true });
        }
      } catch (err) {
        console.error('Failed to save placement result:', err);
      }
    }
  };

  // Intro screen
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {t('placement.title', uiLanguage)}
        </h1>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          {t('placement.description', uiLanguage)}
        </p>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 text-left max-w-md mx-auto">
          <h3 className="font-semibold text-gray-800 mb-3">What to expect:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📝 30 questions across 6 difficulty levels</li>
            <li>⏱️ Takes about 10-15 minutes</li>
            <li>⏭️ You can skip questions you don&apos;t know</li>
            <li>🎯 We&apos;ll recommend the best starting level for you</li>
            <li>🔓 No sign-up required to take the test</li>
          </ul>
        </div>

        <button
          onClick={() => setStarted(true)}
          className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          {t('placement.start', uiLanguage)} →
        </button>
      </div>
    );
  }

  // Result screen
  if (finished && assignedLevel) {
    const score = answers.filter((a) => a.correct).length;
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">🎓</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t('placement.result', uiLanguage)}
        </h1>

        <div className="my-8">
          <LevelBadge level={assignedLevel} size="lg" />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {t(`level.${assignedLevel}`, uiLanguage)}
          </h2>
          <p className="text-gray-500 mt-2">
            {t(`level.${assignedLevel}.desc`, uiLanguage)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-md mx-auto">
          <p className="text-gray-600 mb-4">
            {t('placement.resultMessage', uiLanguage)}: <strong>{assignedLevel}</strong>
          </p>
          <p className="text-sm text-gray-400">
            Score: {score} / {totalQuestions} correct
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <Link
              href="/signup"
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors"
            >
              Sign Up to Save Progress →
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Test question screen
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <LevelBadge level={currentQuestion.level} size="sm" />
        </div>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>

      {/* Question */}
      <MultipleChoice
        key={currentQuestion.id}
        question={currentQuestion.question}
        options={currentQuestion.options || []}
        correctAnswer={currentQuestion.correctAnswer}
        onAnswer={handleAnswer}
      />

      {/* Skip button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleSkip}
          className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-1 mx-auto transition-colors"
        >
          <SkipForward className="w-4 h-4" />
          {t('placement.skip', uiLanguage)}
        </button>
      </div>
    </div>
  );
}
