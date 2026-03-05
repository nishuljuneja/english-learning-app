'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Mic, Lock, MessageCircle } from 'lucide-react';

export default function SpeakingPage() {
  const { uiLanguage } = useAppStore();

  const sampleTopics = [
    { id: 1, title: 'Introduce Yourself', level: 'A1', description: 'Practice introducing yourself — your name, city, and what you do.', prompts: ['My name is...', 'I live in...', 'I work as...'] },
    { id: 2, title: 'Describe Your Family', level: 'A1', description: 'Talk about your family members, their names and occupations.', prompts: ['I have a... family.', 'My father works at...', 'My mother is a...'] },
    { id: 3, title: 'Ask for Directions', level: 'A2', description: 'Practice asking and giving directions in an Indian city.', prompts: ['Excuse me, how do I get to...?', 'Turn left at the...', 'It is near the...'] },
    { id: 4, title: 'Talk About Your Job', level: 'B1', description: 'Describe your work responsibilities and daily routine.', prompts: ['I am responsible for...', 'On a typical day, I...', 'The best part of my job is...'] },
    { id: 5, title: 'Express an Opinion', level: 'B1', description: 'Share your views on a topic and give supporting reasons.', prompts: ['In my opinion...', 'I believe this because...', 'On the other hand...'] },
    { id: 6, title: 'Give a Presentation', level: 'B2', description: 'Practice delivering a short presentation on a topic of your choice.', prompts: ['Today I would like to talk about...', 'Let me explain why...', 'In conclusion...'] },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
          <Mic className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('nav.speaking', uiLanguage)}</h1>
          <p className="text-gray-500 text-sm">Build confidence with guided speaking practice</p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-800 mb-1">Speech Recognition Coming Soon</h2>
            <p className="text-red-700 text-sm">
              Speaking exercises will use the Web Speech API for pronunciation feedback.
              For now, use the prompts below as self-guided speaking practice.
            </p>
          </div>
        </div>
      </div>

      {/* Topic Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {sampleTopics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">{topic.title}</h3>
              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg font-medium">{topic.level}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{topic.description}</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-medium">Practice prompts:</p>
              {topic.prompts.map((prompt, i) => (
                <p key={i} className="text-sm text-indigo-600 italic">&ldquo;{prompt}&rdquo;</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
