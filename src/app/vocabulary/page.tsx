'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { sampleVocabulary, getVocabularyByLevel } from '@/content/vocabulary';
import { Flashcard, LevelBadge } from '@/components/Exercises';
import { BookOpen, Search, Filter } from 'lucide-react';
import type { CEFRLevel, VocabularyWord } from '@/lib/firestore';

export default function VocabularyPage() {
  const { profile, uiLanguage } = useAppStore();
  const currentLevel = profile?.currentLevel || 'A1';
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(currentLevel);
  const [mode, setMode] = useState<'browse' | 'flashcards'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const words = getVocabularyByLevel(selectedLevel).filter((w) =>
    searchQuery
      ? w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.meaning.en.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const currentWord = words[flashcardIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.vocabulary', uiLanguage)}</h1>
            <p className="text-gray-500 text-sm">
              {sampleVocabulary.length} words loaded &middot; Oxford 5000 ready for import
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode('browse')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              mode === 'browse' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => { setMode('flashcards'); setFlashcardIndex(0); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              mode === 'flashcards' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'
            }`}
          >
            Flashcards
          </button>
        </div>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {levels.map((level) => {
          const count = getVocabularyByLevel(level).length;
          return (
            <button
              key={level}
              onClick={() => { setSelectedLevel(level); setFlashcardIndex(0); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedLevel === level
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level} ({count})
            </button>
          );
        })}
      </div>

      {/* Flashcard Mode */}
      {mode === 'flashcards' && words.length > 0 && currentWord && (
        <div className="py-8">
          <div className="text-center text-sm text-gray-400 mb-4">
            {flashcardIndex + 1} / {words.length}
          </div>
          <Flashcard
            front={currentWord.word}
            back={currentWord.meaning[uiLanguage] || currentWord.meaning.en}
            pronunciation={currentWord.pronunciation}
            example={currentWord.example}
            onRate={(quality) => {
              // TODO: Save spaced repetition progress
              if (flashcardIndex < words.length - 1) {
                setFlashcardIndex(flashcardIndex + 1);
              } else {
                setFlashcardIndex(0);
              }
            }}
          />
        </div>
      )}

      {/* Browse Mode */}
      {mode === 'browse' && (
        <>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Word List */}
          <div className="space-y-3">
            {words.map((word) => (
              <div
                key={word.id}
                className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{word.word}</h3>
                      <span className="text-xs text-gray-400 italic">{word.partOfSpeech}</span>
                      {word.pronunciation && (
                        <span className="text-xs text-gray-400">{word.pronunciation}</span>
                      )}
                    </div>
                    <p className="text-gray-600">
                      {word.meaning[uiLanguage] || word.meaning.en}
                    </p>
                    <p className="text-sm text-gray-400 mt-1 italic">&ldquo;{word.example}&rdquo;</p>
                    {word.exampleTranslation[uiLanguage] && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        → {word.exampleTranslation[uiLanguage]}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <LevelBadge level={word.level} size="sm" />
                    <div className="flex gap-1 mt-1">
                      {word.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {words.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No words found for this level yet.</p>
                <p className="text-sm mt-1">Import your Oxford word lists to populate this section.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
