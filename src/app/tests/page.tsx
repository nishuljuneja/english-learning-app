'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { placementQuestions, calculatePlacementLevel } from '@/content/placement-test';
import { MultipleChoice, ProgressBar, LevelBadge } from '@/components/Exercises';
import { SkipForward, ArrowRight, ArrowLeft, ClipboardCheck, TrendingUp, TrendingDown, Minus, History, Clock } from 'lucide-react';
import Link from 'next/link';
import type { CEFRLevel } from '@/lib/firestore';

const LEVEL_ORDER: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const STORAGE_KEY = 'speakeasy-test-history';

interface TestHistoryEntry {
  date: string;
  score: number;
  total: number;
  level: CEFRLevel;
  levelScores: Record<CEFRLevel, { correct: number; total: number }>;
}

function getTestHistory(): TestHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveTestHistory(entry: TestHistoryEntry) {
  const history = getTestHistory();
  history.push(entry);
  // Keep last 20 entries
  if (history.length > 20) history.shift();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// Shuffle questions using Fisher-Yates to make each test feel fresh
function shuffleQuestions<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TestsPage() {
  const { profile, uiLanguage } = useAppStore();
  const [phase, setPhase] = useState<'intro' | 'test' | 'result'>('intro');
  const [questions, setQuestions] = useState(placementQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; answer: string; correct: boolean }[]>([]);
  const [assignedLevel, setAssignedLevel] = useState<CEFRLevel | null>(null);
  const [history, setHistory] = useState<TestHistoryEntry[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    setHistory(getTestHistory());
  }, []);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const startTest = () => {
    setQuestions(shuffleQuestions(placementQuestions));
    setCurrentIndex(0);
    setAnswers([]);
    setAssignedLevel(null);
    setHasAnswered(false);
    setPhase('test');
  };

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
    setHasAnswered(true);
  };

  const handleNext = () => {
    setHasAnswered(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest(answers);
    }
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

  const finishTest = (finalAnswers: typeof answers) => {
    const level = calculatePlacementLevel(finalAnswers);
    setAssignedLevel(level);

    // Calculate per-level breakdown
    const levelScores: Record<CEFRLevel, { correct: number; total: number }> = {
      A1: { correct: 0, total: 0 },
      A2: { correct: 0, total: 0 },
      B1: { correct: 0, total: 0 },
      B2: { correct: 0, total: 0 },
      C1: { correct: 0, total: 0 },
      C2: { correct: 0, total: 0 },
    };
    finalAnswers.forEach(({ questionId, correct }) => {
      const q = placementQuestions.find((p) => p.id === questionId);
      if (q) {
        levelScores[q.level].total++;
        if (correct) levelScores[q.level].correct++;
      }
    });

    const entry: TestHistoryEntry = {
      date: new Date().toISOString(),
      score: finalAnswers.filter((a) => a.correct).length,
      total: totalQuestions,
      level,
      levelScores,
    };
    saveTestHistory(entry);
    setHistory(getTestHistory());
    setPhase('result');
  };

  const previousLevel = profile?.currentLevel || 'A1';
  const prevIndex = LEVEL_ORDER.indexOf(previousLevel);
  const newIndex = assignedLevel ? LEVEL_ORDER.indexOf(assignedLevel) : prevIndex;
  const levelDiff = newIndex - prevIndex;

  // ── INTRO ──
  if (phase === 'intro') {
    const lastTest = history.length > 0 ? history[history.length - 1] : null;
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Progress Test</h1>
            <p className="text-gray-500 text-sm">Check your current level and track improvement over time</p>
          </div>
        </div>

        {/* Current Level Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Your Current Level</p>
              <div className="flex items-center gap-3">
                <LevelBadge level={previousLevel} size="lg" />
                <div>
                  <p className="font-semibold text-gray-800">{t(`level.${previousLevel}`, uiLanguage)}</p>
                  <p className="text-sm text-gray-400">{t(`level.${previousLevel}.desc`, uiLanguage)}</p>
                </div>
              </div>
            </div>
            {lastTest && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Last tested</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(lastTest.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <p className="text-xs text-gray-400">{lastTest.score}/{lastTest.total} correct</p>
              </div>
            )}
          </div>
        </div>

        {/* About the test */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">About this test</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📝 {placementQuestions.length} questions across {LEVEL_ORDER.length} difficulty levels</li>
            <li>⏱️ Takes about 10–15 minutes</li>
            <li>⏭️ Skip questions you don&apos;t know — that&apos;s useful data too</li>
            <li>📊 See a detailed breakdown of your strengths per level</li>
            <li>🔄 Take it as often as you like to track your progress</li>
          </ul>
        </div>

        <button
          onClick={startTest}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Start Progress Test →
        </button>

        {/* Test History */}
        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-4">
              <History className="w-5 h-5 text-gray-500" />
              Test History
            </h3>
            <div className="space-y-3">
              {[...history].reverse().map((entry, i) => {
                const pct = Math.round((entry.score / entry.total) * 100);
                return (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-sm font-bold text-gray-500">
                        #{history.length - i}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <LevelBadge level={entry.level} size="sm" />
                          <span className="text-sm font-medium text-gray-700">{pct}%</span>
                          <span className="text-xs text-gray-400">({entry.score}/{entry.total})</span>
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(entry.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    {i < history.length - 1 && (() => {
                      const prevEntry = [...history].reverse()[i + 1];
                      const diff = entry.score - prevEntry.score;
                      if (diff > 0) return <span className="text-green-500 text-xs font-medium flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />+{diff}</span>;
                      if (diff < 0) return <span className="text-red-500 text-xs font-medium flex items-center gap-1"><TrendingDown className="w-3.5 h-3.5" />{diff}</span>;
                      return <span className="text-gray-400 text-xs font-medium flex items-center gap-1"><Minus className="w-3.5 h-3.5" />same</span>;
                    })()}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── TEST ──
  if (phase === 'test') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <LevelBadge level={currentQuestion.level} size="sm" />
          </div>
          <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        </div>

        <MultipleChoice
          key={currentQuestion.id}
          question={currentQuestion.question}
          options={currentQuestion.options || []}
          correctAnswer={currentQuestion.correctAnswer}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />

        {!hasAnswered && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-1 mx-auto transition-colors"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── RESULT ──
  if (phase === 'result' && assignedLevel) {
    const score = answers.filter((a) => a.correct).length;
    const pct = Math.round((score / totalQuestions) * 100);

    // Group scores by level
    const levelScores: Record<string, { correct: number; total: number }> = {};
    LEVEL_ORDER.forEach((lvl) => { levelScores[lvl] = { correct: 0, total: 0 }; });
    answers.forEach(({ questionId, correct }) => {
      const q = placementQuestions.find((p) => p.id === questionId);
      if (q) {
        levelScores[q.level].total++;
        if (correct) levelScores[q.level].correct++;
      }
    });

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Level Result */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">
            {levelDiff > 0 ? '🎉' : levelDiff === 0 ? '💪' : '📚'}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Current Level</h1>
          <div className="my-6">
            <LevelBadge level={assignedLevel} size="lg" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {t(`level.${assignedLevel}`, uiLanguage)}
            </h2>
          </div>

          {/* Comparison with previous */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            levelDiff > 0
              ? 'bg-green-50 text-green-700'
              : levelDiff === 0
              ? 'bg-blue-50 text-blue-700'
              : 'bg-amber-50 text-amber-700'
          }`}>
            {levelDiff > 0 && <TrendingUp className="w-4 h-4" />}
            {levelDiff === 0 && <Minus className="w-4 h-4" />}
            {levelDiff < 0 && <TrendingDown className="w-4 h-4" />}
            {levelDiff > 0
              ? `Level up! You improved from ${previousLevel} to ${assignedLevel}`
              : levelDiff === 0
              ? `Holding steady at ${assignedLevel} — keep practicing!`
              : `Your level changed from ${previousLevel} to ${assignedLevel} — focus on the basics`
            }
          </div>
        </div>

        {/* Score Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Overall Score</h3>
            <span className="text-2xl font-bold text-indigo-600">{pct}%</span>
          </div>
          <ProgressBar current={score} total={totalQuestions} />
          <p className="text-sm text-gray-500 mt-2">{score} of {totalQuestions} correct</p>
        </div>

        {/* Per-level breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Breakdown by Level</h3>
          <div className="space-y-3">
            {LEVEL_ORDER.map((lvl) => {
              const ls = levelScores[lvl];
              if (ls.total === 0) return null;
              const lvlPct = Math.round((ls.correct / ls.total) * 100);
              return (
                <div key={lvl} className="flex items-center gap-3">
                  <LevelBadge level={lvl} size="sm" />
                  <div className="flex-1">
                    <ProgressBar current={ls.correct} total={ls.total} />
                  </div>
                  <span className={`text-sm font-medium w-16 text-right ${
                    lvlPct >= 60 ? 'text-green-600' : lvlPct >= 40 ? 'text-amber-600' : 'text-red-500'
                  }`}>
                    {ls.correct}/{ls.total} ({lvlPct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setPhase('intro')}
            className="flex-1 py-3 px-6 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tests
          </button>
          <Link
            href="/dashboard"
            className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
