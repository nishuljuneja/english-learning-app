'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

// ==================== Flashcard Component ====================
interface FlashcardProps {
  front: string;
  back: string;
  pronunciation?: string;
  example?: string;
  onRate: (quality: number) => void; // 0-5 SM-2 rating
}

export function Flashcard({ front, back, pronunciation, example, onRate }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const { uiLanguage } = useAppStore();

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className="relative h-64 cursor-pointer flashcard-container"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`flashcard-inner h-full ${flipped ? 'flipped' : ''}`}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-center p-6 flashcard-front border-2 border-indigo-100 shadow-lg">
            <p className="text-3xl font-bold text-gray-800">{front}</p>
            {pronunciation && (
              <p className="text-sm text-gray-400 mt-2">{pronunciation}</p>
            )}
            <p className="text-xs text-gray-400 mt-4">Tap to reveal</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center p-6 flashcard-back border-2 border-indigo-200 shadow-lg">
            <p className="text-2xl font-bold text-indigo-800">{back}</p>
            {example && (
              <p className="text-sm text-gray-600 mt-3 italic text-center">&ldquo;{example}&rdquo;</p>
            )}
          </div>
        </div>
      </div>

      {/* Rating buttons - only show when flipped */}
      {flipped && (
        <div className="mt-6 space-y-2">
          <p className="text-center text-sm text-gray-500">How well did you know this?</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => { onRate(1); setFlipped(false); }}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
            >
              Didn&apos;t know
            </button>
            <button
              onClick={() => { onRate(3); setFlipped(false); }}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition"
            >
              Hard
            </button>
            <button
              onClick={() => { onRate(4); setFlipped(false); }}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
            >
              Good
            </button>
            <button
              onClick={() => { onRate(5); setFlipped(false); }}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
            >
              Easy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== Multiple Choice Component ====================
interface MultipleChoiceProps {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  onAnswer: (correct: boolean) => void;
}

export function MultipleChoice({ question, options, correctAnswer, explanation, onAnswer }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { uiLanguage } = useAppStore();

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    onAnswer(option === correctAnswer);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{question}</h3>

      <div className="space-y-3">
        {options.map((option) => {
          let btnClass = 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50';
          if (showResult) {
            if (option === correctAnswer) {
              btnClass = 'border-green-500 bg-green-50 text-green-800';
            } else if (option === selected && option !== correctAnswer) {
              btnClass = 'border-red-500 bg-red-50 text-red-800';
            } else {
              btnClass = 'border-gray-200 opacity-50';
            }
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${btnClass}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && option === selected && option !== correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && explanation && (
        <div className={`mt-4 p-4 rounded-lg ${
          selected === correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className="text-sm font-medium mb-1">
            {selected === correctAnswer ? t('common.correct', uiLanguage) : t('common.incorrect', uiLanguage)}
          </p>
          <p className="text-sm text-gray-600">{explanation}</p>
        </div>
      )}
    </div>
  );
}

// ==================== Fill in the Blank Component ====================
interface FillBlankProps {
  question: string; // Contains _____ for the blank
  correctAnswer: string;
  explanation?: string;
  onAnswer: (correct: boolean) => void;
}

export function FillBlank({ question, correctAnswer, explanation, onAnswer }: FillBlankProps) {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { uiLanguage } = useAppStore();

  const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();

  const handleSubmit = () => {
    setShowResult(true);
    onAnswer(isCorrect);
  };

  const parts = question.split('_____');

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6">
      <div className="text-lg text-gray-800 mb-4">
        <span>{parts[0]}</span>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !showResult && handleSubmit()}
          disabled={showResult}
          className={`inline-block w-32 mx-1 px-3 py-1 border-b-2 text-center text-lg font-medium focus:outline-none transition-colors ${
            showResult
              ? isCorrect
                ? 'border-green-500 text-green-700 bg-green-50'
                : 'border-red-500 text-red-700 bg-red-50'
              : 'border-indigo-400 focus:border-indigo-600'
          }`}
          placeholder="?"
          autoFocus
        />
        <span>{parts[1] || ''}</span>
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {t('common.submit', uiLanguage)}
        </button>
      )}

      {showResult && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className="text-sm font-medium mb-1">
            {isCorrect ? t('common.correct', uiLanguage) : `${t('common.incorrect', uiLanguage)} — Answer: ${correctAnswer}`}
          </p>
          {explanation && <p className="text-sm text-gray-600">{explanation}</p>}
        </div>
      )}
    </div>
  );
}

// ==================== Progress Bar Component ====================
interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{current}/{total}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ==================== Level Badge Component ====================
interface LevelBadgeProps {
  level: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const colors: Record<string, string> = {
    A1: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    A2: 'bg-green-100 text-green-800 border-green-300',
    B1: 'bg-blue-100 text-blue-800 border-blue-300',
    B2: 'bg-purple-100 text-purple-800 border-purple-300',
    C1: 'bg-orange-100 text-orange-800 border-orange-300',
    C2: 'bg-red-100 text-red-800 border-red-300',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span className={`inline-block font-bold rounded-full border ${colors[level] || colors.A1} ${sizes[size]}`}>
      {level}
    </span>
  );
}

// ==================== Score Card Component ====================
interface ScoreCardProps {
  score: number;
  total: number;
  onRetry?: () => void;
  onContinue?: () => void;
}

export function ScoreCard({ score, total, onRetry, onContinue }: ScoreCardProps) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;
  const { uiLanguage } = useAppStore();

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className={`text-6xl mb-4 ${passed ? 'text-green-500' : 'text-orange-500'}`}>
        {passed ? '🎉' : '💪'}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {passed ? t('common.wellDone', uiLanguage) : t('common.keepGoing', uiLanguage)}
      </h2>

      <div className="text-5xl font-bold text-indigo-600 my-4">
        {percentage}%
      </div>

      <p className="text-gray-500 mb-6">
        {score} / {total} {t('common.correct', uiLanguage).replace('!', '')}
      </p>

      <div className="flex gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            <RotateCcw className="w-4 h-4" />
            {t('common.tryAgain', uiLanguage)}
          </button>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            {t('common.continue', uiLanguage)}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
