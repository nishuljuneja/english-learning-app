'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Headphones, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ListeningPage() {
  const { profile, uiLanguage } = useAppStore();

  const sampleExercises = [
    { id: 1, title: 'At the Train Station', level: 'A1', duration: '2 min', description: 'Listen to a conversation about buying a train ticket at Mumbai Central.' },
    { id: 2, title: 'Ordering at a Restaurant', level: 'A1', duration: '3 min', description: 'Listen to a customer ordering food at an Indian restaurant.' },
    { id: 3, title: 'Phone Conversation', level: 'A2', duration: '3 min', description: 'Listen to a phone call about scheduling a meeting.' },
    { id: 4, title: 'News Report', level: 'B1', duration: '4 min', description: 'Listen to a short news report about Indian technology sector.' },
    { id: 5, title: 'Job Interview', level: 'B1', duration: '5 min', description: 'Listen to a mock job interview at an IT company.' },
    { id: 6, title: 'University Lecture', level: 'B2', duration: '8 min', description: 'Listen to an academic lecture about environmental sustainability.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
          <Headphones className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('nav.listening', uiLanguage)}</h1>
          <p className="text-gray-500 text-sm">Train your ear with Indian-accent English audio</p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Headphones className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-yellow-800 mb-1">Audio Content Coming Soon</h2>
            <p className="text-yellow-700 text-sm">
              We&apos;re recording listening exercises with authentic Indian English speakers.
              Audio features require Firebase Storage setup. Stay tuned!
            </p>
          </div>
        </div>
      </div>

      {/* Preview Exercises */}
      <h3 className="text-lg font-bold text-gray-700 mb-4">Planned Exercises</h3>
      <div className="space-y-3">
        {sampleExercises.map((ex) => (
          <div key={ex.id} className="bg-white rounded-xl p-5 border border-gray-100 opacity-60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{ex.title}</h4>
                  <p className="text-xs text-gray-400">{ex.level} · {ex.duration}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 ml-13">{ex.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
