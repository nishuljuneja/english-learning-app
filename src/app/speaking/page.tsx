'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Mic, MicOff, Play, Pause, ChevronLeft, CheckCircle, Volume2, RotateCcw } from 'lucide-react';
import { LevelBadge } from '@/components/Exercises';
import { speakingExercises, type SpeakingExercise } from '@/content/speaking-exercises';
import type { CEFRLevel } from '@/lib/firestore';

type Phase = 'list' | 'exercise';

export default function SpeakingPage() {
  const { uiLanguage } = useAppStore();
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');
  const [phase, setPhase] = useState<Phase>('list');
  const [exercise, setExercise] = useState<SpeakingExercise | null>(null);

  // Practice state
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState<Record<number, { spoken: string; match: number }>>({});
  const [rolePlayStep, setRolePlayStep] = useState(0);

  const recognitionRef = useRef<ReturnType<typeof createRecognition> | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const indianVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    // Find the best Indian English voice available
    const pickIndianVoice = () => {
      const voices = synthRef.current?.getVoices() ?? [];
      // Priority: en-IN voices first, then en-GB (closer to Indian accent than en-US)
      const enIN = voices.filter((v) => v.lang === 'en-IN' || v.lang.startsWith('en-IN'));
      if (enIN.length > 0) {
        // Prefer voices with "India" or "Hindi" in the name
        indianVoiceRef.current =
          enIN.find((v) => /india|hindi|rishi|aditi|kajal/i.test(v.name)) || enIN[0];
        return;
      }
      // Fallback: en-GB is closer to Indian pronunciation than en-US
      const enGB = voices.find((v) => v.lang === 'en-GB');
      if (enGB) {
        indianVoiceRef.current = enGB;
        return;
      }
      indianVoiceRef.current = null;
    };

    pickIndianVoice();
    // Voices may load asynchronously in some browsers
    synthRef.current?.addEventListener?.('voiceschanged', pickIndianVoice);

    return () => {
      synthRef.current?.cancel();
      synthRef.current?.removeEventListener?.('voiceschanged', pickIndianVoice);
    };
  }, []);

  const filteredExercises = selectedLevel === 'all'
    ? speakingExercises
    : speakingExercises.filter((e) => e.level === selectedLevel);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function createRecognition(): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.lang = 'en-IN';
    r.interimResults = false;
    r.maxAlternatives = 1;
    return r;
  }

  const speak = useCallback((text: string, rate = 0.9) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.lang = 'en-IN';
    if (indianVoiceRef.current) {
      u.voice = indianVoiceRef.current;
    }
    u.onstart = () => setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    synthRef.current.speak(u);
  }, []);

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();

  const similarity = (a: string, b: string): number => {
    const na = normalize(a).split(' ');
    const nb = normalize(b).split(' ');
    if (nb.length === 0) return 0;
    const matched = nb.filter((w) => na.includes(w)).length;
    return Math.round((matched / nb.length) * 100);
  };

  const startListening = useCallback((targetText: string, stepIdx: number) => {
    const r = createRecognition();
    if (!r) {
      alert('Speech Recognition is not supported in this browser. Please try Chrome.');
      return;
    }
    recognitionRef.current = r;
    setTranscript('');
    setIsListening(true);

    r.onresult = (event: { results: { transcript: string }[][] }) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      const match = similarity(spoken, targetText);
      setResults((prev) => ({ ...prev, [stepIdx]: { spoken, match } }));
      setIsListening(false);
    };
    r.onerror = () => setIsListening(false);
    r.onend = () => setIsListening(false);
    r.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startExercise = (ex: SpeakingExercise) => {
    setExercise(ex);
    setPhase('exercise');
    setCurrentStep(0);
    setTranscript('');
    setResults({});
    setRolePlayStep(0);
  };

  const handleBack = () => {
    stopListening();
    synthRef.current?.cancel();
    setPhase('list');
    setExercise(null);
  };

  // ── LIST VIEW ──
  if (phase === 'list') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <Mic className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.speaking', uiLanguage)}</h1>
            <p className="text-gray-500 text-sm">Practice speaking with voice recognition</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', ...levels] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedLevel === level
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level === 'all' ? 'All Levels' : level}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => startExercise(ex)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <Mic className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{ex.title}</h4>
                    <p className="text-xs text-gray-400">{ex.topic} · {ex.type}</p>
                  </div>
                </div>
                <LevelBadge level={ex.level} size="sm" />
              </div>
              <p className="text-sm text-gray-500 mt-2">{ex.description}</p>
            </div>
          ))}
          {filteredExercises.length === 0 && (
            <p className="text-center text-gray-400 py-12">No exercises for this level yet.</p>
          )}
        </div>
      </div>
    );
  }

  if (!exercise) return null;

  const totalSteps = exercise.type === 'role-play'
    ? (exercise.rolePlayScript ?? []).length
    : exercise.sentences.length;

  // ── EXERCISE VIEW ──
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 text-sm mb-4 flex items-center gap-1">
        <ChevronLeft className="w-4 h-4" /> Back to exercises
      </button>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">{exercise.title}</h2>
          <LevelBadge level={exercise.level} />
        </div>
        <p className="text-sm text-gray-500">{exercise.description}</p>
      </div>

      {/* Tips */}
      {exercise.tips && exercise.tips.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-xs font-medium text-red-800 mb-1">Tips:</p>
          <ul className="text-sm text-red-700 space-y-1">
            {exercise.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
          </ul>
        </div>
      )}

      {/* ── REPEAT / RESPOND / DESCRIBE ── */}
      {exercise.type !== 'role-play' && (
        <div className="space-y-4">
          {/* Progress */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sentence {currentStep + 1} of {exercise.sentences.length}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${((currentStep + 1) / exercise.sentences.length) * 100}%` }} />
            </div>
          </div>

          {/* Current sentence */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <p className="text-lg font-medium text-gray-800 mb-2">{exercise.sentences[currentStep].text}</p>
            {exercise.sentences[currentStep].hint && (
              <p className="text-sm text-indigo-600 italic">{exercise.sentences[currentStep].hint}</p>
            )}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button onClick={() => speak(exercise.sentences[currentStep].text)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition text-sm">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                Listen
              </button>
              <button
                onClick={() => isListening ? stopListening() : startListening(exercise.sentences[currentStep].text, currentStep)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition text-sm ${
                  isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {isListening ? <><MicOff className="w-4 h-4" /> Stop</> : <><Mic className="w-4 h-4" /> Speak</>}
              </button>
            </div>
          </div>

          {/* Result for current step */}
          {results[currentStep] && (
            <div className={`rounded-xl p-4 border ${
              results[currentStep].match >= 70 ? 'bg-green-50 border-green-300' :
              results[currentStep].match >= 40 ? 'bg-yellow-50 border-yellow-300' :
              'bg-red-50 border-red-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Your speech:</span>
                <span className={`text-sm font-bold ${
                  results[currentStep].match >= 70 ? 'text-green-600' :
                  results[currentStep].match >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>{results[currentStep].match}% match</span>
              </div>
              <p className="text-sm text-gray-600 italic">&ldquo;{results[currentStep].spoken}&rdquo;</p>
              {results[currentStep].match < 70 && (
                <button onClick={() => startListening(exercise.sentences[currentStep].text, currentStep)}
                  className="mt-2 text-sm text-red-600 hover:underline flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Try again
                </button>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
                ← Previous
              </button>
            )}
            {currentStep < exercise.sentences.length - 1 ? (
              <button onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
                Next →
              </button>
            ) : (
              <button onClick={handleBack}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
                <CheckCircle className="w-4 h-4 inline mr-2" /> Done
              </button>
            )}
          </div>

          {/* Completed overview */}
          {Object.keys(results).length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-2">Your results so far:</p>
              <div className="flex flex-wrap gap-2">
                {exercise.sentences.map((_, idx) => (
                  <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    results[idx]?.match >= 70 ? 'bg-green-100 text-green-700' :
                    results[idx]?.match >= 40 ? 'bg-yellow-100 text-yellow-700' :
                    results[idx] ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {results[idx] ? `${results[idx].match}` : idx + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ROLE PLAY ── */}
      {exercise.type === 'role-play' && exercise.rolePlayScript && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
            🎭 Role-play: The system will speak first, then it&apos;s your turn. Listen and respond!
          </div>

          {/* Conversation so far */}
          <div className="space-y-3">
            {exercise.rolePlayScript.slice(0, rolePlayStep + 1).map((line, idx) => (
              <div key={idx} className={`flex ${line.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  line.speaker === 'system' ? 'bg-gray-100 text-gray-800 rounded-bl-sm' : 'bg-red-100 text-red-800 rounded-br-sm'
                }`}>
                  <p className="text-xs font-medium mb-1 opacity-60">
                    {line.speaker === 'system' ? '🤖 System' : '🎤 You'}
                  </p>
                  <p className="text-sm">{line.line}</p>
                  {line.hint && <p className="text-xs text-gray-500 italic mt-1">Hint: {line.hint}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          {rolePlayStep < exercise.rolePlayScript.length && (
            <div className="flex items-center justify-center gap-3">
              {exercise.rolePlayScript[rolePlayStep]?.speaker === 'system' ? (
                <button onClick={() => {
                  speak(exercise.rolePlayScript![rolePlayStep].line);
                  setTimeout(() => setRolePlayStep(rolePlayStep + 1), 2000);
                }}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">
                  <Play className="w-4 h-4" /> Play system line
                </button>
              ) : (
                <button
                  onClick={() => isListening ? stopListening() : startListening(
                    exercise.rolePlayScript![rolePlayStep].line, rolePlayStep
                  )}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                    isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {isListening ? <><MicOff className="w-4 h-4" /> Stop</> : <><Mic className="w-4 h-4" /> Your turn — Speak</>}
                </button>
              )}
            </div>
          )}

          {/* Transcript feedback */}
          {results[rolePlayStep] && (
            <div className={`rounded-xl p-4 border ${
              results[rolePlayStep].match >= 60 ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'
            }`}>
              <p className="text-sm text-gray-600">You said: &ldquo;{results[rolePlayStep].spoken}&rdquo;</p>
              <p className="text-sm font-medium mt-1">{results[rolePlayStep].match}% match</p>
            </div>
          )}

          {/* Next in role play */}
          {results[rolePlayStep] && rolePlayStep < exercise.rolePlayScript.length - 1 && (
            <button onClick={() => setRolePlayStep(rolePlayStep + 1)}
              className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
              Continue →
            </button>
          )}

          {rolePlayStep >= exercise.rolePlayScript.length - 1 && results[rolePlayStep] && (
            <button onClick={handleBack}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
              <CheckCircle className="w-4 h-4 inline mr-2" /> Conversation Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
