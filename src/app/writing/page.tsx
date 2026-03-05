'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { PenTool, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { LevelBadge } from '@/components/Exercises';
import type { CEFRLevel } from '@/lib/firestore';

interface WritingPrompt {
  id: string;
  level: CEFRLevel;
  title: string;
  instruction: string;
  hint: string;
  minWords: number;
  maxWords: number;
  sampleAnswer?: string;
}

const writingPrompts: WritingPrompt[] = [
  {
    id: 'w-a1-1',
    level: 'A1',
    title: 'Write About Your Day',
    instruction: 'Write 5-8 sentences about what you did today. Use simple past tense (I went, I ate, I saw).',
    hint: 'Start with "Today I woke up at..." and describe your activities.',
    minWords: 30,
    maxWords: 80,
    sampleAnswer: 'Today I woke up at 7 AM. I had tea and roti for breakfast. Then I went to work by bus. I worked on the computer from 9 to 5. After work, I went to the market. I bought vegetables and fruits. I cooked dinner at home. I watched TV and went to sleep at 10 PM.',
  },
  {
    id: 'w-a1-2',
    level: 'A1',
    title: 'Describe Your Home',
    instruction: 'Write about your home. How many rooms does it have? What is your favourite room?',
    hint: 'Use "There is / There are" and adjectives like big, small, clean, cozy.',
    minWords: 30,
    maxWords: 80,
  },
  {
    id: 'w-a2-1',
    level: 'A2',
    title: 'Write an Email to a Friend',
    instruction: 'Write a short email inviting a friend to your birthday party. Include the date, time, place, and what to bring.',
    hint: 'Start with "Dear [name]," and end with "Best wishes" or "See you soon!"',
    minWords: 50,
    maxWords: 120,
  },
  {
    id: 'w-b1-1',
    level: 'B1',
    title: 'Opinion: Social Media',
    instruction: 'Write a short paragraph expressing your opinion on social media. Is it helpful or harmful for students? Give reasons.',
    hint: 'Use phrases like "In my opinion...", "I believe...", "On the other hand..."',
    minWords: 80,
    maxWords: 200,
  },
  {
    id: 'w-b1-2',
    level: 'B1',
    title: 'Letter of Complaint',
    instruction: 'Write a formal letter to a company complaining about a product you purchased that was damaged.',
    hint: 'Use formal language: "I am writing to express my dissatisfaction with..."',
    minWords: 100,
    maxWords: 250,
  },
  {
    id: 'w-b2-1',
    level: 'B2',
    title: 'Essay: Technology in Education',
    instruction: 'Write a short essay discussing the advantages and disadvantages of technology in Indian classrooms.',
    hint: 'Use a clear structure: introduction, advantages, disadvantages, conclusion.',
    minWords: 150,
    maxWords: 350,
  },
];

export default function WritingPage() {
  const { uiLanguage } = useAppStore();
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const filteredPrompts = selectedLevel === 'all'
    ? writingPrompts
    : writingPrompts.filter((p) => p.level === selectedLevel);

  const handleSubmit = () => setSubmitted(true);

  const handleBack = () => {
    setSelectedPrompt(null);
    setText('');
    setSubmitted(false);
    setShowSample(false);
  };

  // ── PROMPT SELECTION ──
  if (!selectedPrompt) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
            <PenTool className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.writing', uiLanguage)}</h1>
            <p className="text-gray-500 text-sm">Practice writing with guided prompts</p>
          </div>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedLevel === level
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level === 'all' ? 'All Levels' : level}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedPrompt(prompt)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{prompt.title}</h3>
                <LevelBadge level={prompt.level} size="sm" />
              </div>
              <p className="text-sm text-gray-500 mb-2">{prompt.instruction}</p>
              <p className="text-xs text-gray-400">{prompt.minWords}–{prompt.maxWords} words</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── WRITING PHASE ──
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 text-sm mb-4 flex items-center gap-1">
        ← Back to prompts
      </button>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800">{selectedPrompt.title}</h2>
          <LevelBadge level={selectedPrompt.level} />
        </div>
        <p className="text-gray-600 mb-2">{selectedPrompt.instruction}</p>
        <p className="text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
          💡 Hint: {selectedPrompt.hint}
        </p>
      </div>

      {!submitted ? (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing here..."
            rows={12}
            className="w-full p-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 text-sm">
              <span className={`font-medium ${
                wordCount < selectedPrompt.minWords ? 'text-red-500' :
                wordCount > selectedPrompt.maxWords ? 'text-orange-500' : 'text-green-500'
              }`}>
                {wordCount} words
              </span>
              <span className="text-gray-400">
                (target: {selectedPrompt.minWords}–{selectedPrompt.maxWords})
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={wordCount < selectedPrompt.minWords}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Send className="w-4 h-4" /> Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-green-800">Submitted!</h3>
            </div>
            <p className="text-green-700 text-sm mb-3">
              Great job! You wrote {wordCount} words. AI-powered feedback will be available soon.
            </p>
            <div className="bg-white rounded-lg p-4 text-gray-700 whitespace-pre-line text-sm">
              {text}
            </div>
          </div>

          {/* Quick Self-Check */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-bold text-yellow-800">Self-Check Checklist</h3>
            </div>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 accent-yellow-600" />
                <span>Did you use proper capitalization and punctuation?</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 accent-yellow-600" />
                <span>Are your verb tenses consistent?</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 accent-yellow-600" />
                <span>Did you use articles (a, an, the) correctly?</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 accent-yellow-600" />
                <span>Does each sentence express a complete thought?</span>
              </li>
              <li className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 accent-yellow-600" />
                <span>Did you avoid direct translation from your mother tongue?</span>
              </li>
            </ul>
          </div>

          {/* Sample Answer */}
          {selectedPrompt.sampleAnswer && (
            <div>
              <button
                onClick={() => setShowSample(!showSample)}
                className="text-sm text-indigo-600 hover:underline font-medium"
              >
                {showSample ? 'Hide' : 'Show'} sample answer
              </button>
              {showSample && (
                <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-indigo-800 whitespace-pre-line">
                  {selectedPrompt.sampleAnswer}
                </div>
              )}
            </div>
          )}

          <button onClick={handleBack} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
            Try Another Prompt
          </button>
        </div>
      )}
    </div>
  );
}
