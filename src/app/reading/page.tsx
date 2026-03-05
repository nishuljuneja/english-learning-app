'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { readingPassages, getReadingPassagesByLevel } from '@/content/reading-passages';
import { MultipleChoice, ProgressBar, ScoreCard, LevelBadge } from '@/components/Exercises';
import { BookOpen, ArrowLeft, Clock, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import type { CEFRLevel, ReadingPassage } from '@/lib/firestore';

export default function ReadingPage() {
  const { profile, uiLanguage } = useAppStore();
  const currentLevel = profile?.currentLevel || 'A1';
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(currentLevel);
  const [activePassage, setActivePassage] = useState<ReadingPassage | null>(null);
  const [phase, setPhase] = useState<'list' | 'read' | 'quiz' | 'result'>('list');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const passages = getReadingPassagesByLevel(selectedLevel);

  const readingTimeMinutes = activePassage
    ? Math.ceil(activePassage.content.split(' ').length / 150)
    : 0;

  const handleStartReading = (passage: ReadingPassage) => {
    setActivePassage(passage);
    setPhase('read');
    setQuestionIndex(0);
    setScore(0);
  };

  const handleStartQuiz = () => setPhase('quiz');

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(score + 1);
    if (questionIndex < activePassage!.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setPhase('result');
    }
  };

  const handleBack = () => {
    setActivePassage(null);
    setPhase('list');
  };

  // ── PASSAGE LIST ──
  if (phase === 'list') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.reading', uiLanguage)}</h1>
            <p className="text-gray-500 text-sm">Improve comprehension with Indian-context passages</p>
          </div>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {levels.map((level) => {
            const count = getReadingPassagesByLevel(level).length;
            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  selectedLevel === level
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level} ({count})
              </button>
            );
          })}
        </div>

        {/* Passage Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {passages.map((passage) => {
            const wordCount = passage.content.split(' ').length;
            const mins = Math.ceil(wordCount / 150);
            return (
              <div
                key={passage.id}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleStartReading(passage)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{passage.title}</h3>
                  <LevelBadge level={passage.level} size="sm" />
                </div>
                <p className="text-gray-500 text-sm mb-3">{passage.topic}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {mins} min read
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> {passage.questions.length} questions
                  </span>
                  <span>{wordCount} words</span>
                </div>
              </div>
            );
          })}

          {passages.length === 0 && (
            <div className="col-span-2 text-center py-12 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No passages available for this level yet.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── READING PHASE ──
  if (phase === 'read' && activePassage) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to passages
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{activePassage.title}</h1>
            <LevelBadge level={activePassage.level} />
          </div>
          <p className="text-sm text-gray-400 mb-6">
            {readingTimeMinutes} min read &middot; {activePassage.questions.length} comprehension questions
          </p>
          <div className="prose prose-lg max-w-none mb-8 leading-relaxed text-gray-700 whitespace-pre-line">
            {activePassage.content}
          </div>
          <button
            onClick={handleStartQuiz}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Take Comprehension Quiz →
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ PHASE ──
  if (phase === 'quiz' && activePassage) {
    const question = activePassage.questions[questionIndex];
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <ProgressBar current={questionIndex + 1} total={activePassage.questions.length} />
        <div className="mt-6 bg-white rounded-2xl p-8">
          <p className="text-xs text-gray-400 mb-2">
            Question {questionIndex + 1} of {activePassage.questions.length}
          </p>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          {question.questionTranslations?.[uiLanguage] && (
            <p className="text-sm text-gray-400 -mt-4 mb-6">{question.questionTranslations[uiLanguage]}</p>
          )}
          <MultipleChoice
            question={question.question}
            options={question.options || []}
            correctAnswer={question.correctAnswer}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    );
  }

  // ── RESULT PHASE ──
  if (phase === 'result' && activePassage) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <ScoreCard
          score={score}
          total={activePassage.questions.length}
          onContinue={handleBack}
          onRetry={() => {
            setPhase('read');
            setQuestionIndex(0);
            setScore(0);
          }}
        />
      </div>
    );
  }

  return null;
}
