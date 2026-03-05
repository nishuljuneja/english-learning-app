'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Headphones, Play, Pause, RotateCcw, CheckCircle, XCircle, Volume2, ChevronLeft } from 'lucide-react';
import { LevelBadge, ScoreCard } from '@/components/Exercises';
import { listeningExercises, type ListeningExercise } from '@/content/listening-exercises';
import type { CEFRLevel } from '@/lib/firestore';

type Phase = 'list' | 'exercise' | 'result';

export default function ListeningPage() {
  const { uiLanguage } = useAppStore();
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'all'>('all');
  const [phase, setPhase] = useState<Phase>('list');
  const [exercise, setExercise] = useState<ListeningExercise | null>(null);

  // Dictation state
  const [dictationIndex, setDictationIndex] = useState(0);
  const [dictationAnswers, setDictationAnswers] = useState<string[]>([]);
  const [dictationSubmitted, setDictationSubmitted] = useState(false);

  // Gap-fill state
  const [gapAnswers, setGapAnswers] = useState<string[]>([]);
  const [gapSubmitted, setGapSubmitted] = useState(false);

  // Comprehension state
  const [compAnswers, setCompAnswers] = useState<Record<number, string>>({});
  const [compSubmitted, setCompSubmitted] = useState(false);

  // TTS state
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const indianVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    const pickIndianVoice = () => {
      const voices = synthRef.current?.getVoices() ?? [];
      const enIN = voices.filter((v) => v.lang.startsWith('en-IN'));
      if (enIN.length) {
        const preferred = enIN.find((v) =>
          /india|hindi|rishi|aditi|kajal/i.test(v.name)
        );
        indianVoiceRef.current = preferred ?? enIN[0];
        return;
      }
      const enGB = voices.find((v) => v.lang.startsWith('en-GB'));
      if (enGB) { indianVoiceRef.current = enGB; return; }
      indianVoiceRef.current = null;
    };

    pickIndianVoice();
    synthRef.current.addEventListener('voiceschanged', pickIndianVoice);

    return () => {
      synthRef.current?.removeEventListener('voiceschanged', pickIndianVoice);
      synthRef.current?.cancel();
    };
  }, []);

  const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  const filteredExercises = selectedLevel === 'all'
    ? listeningExercises
    : listeningExercises.filter((e) => e.level === selectedLevel);

  const speak = useCallback((text: string, rate?: number) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate ?? 0.9;
    utterance.lang = 'en-IN';
    if (indianVoiceRef.current) {
      utterance.voice = indianVoiceRef.current;
    }
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    synthRef.current.speak(utterance);
  }, []);

  const stopSpeech = useCallback(() => {
    synthRef.current?.cancel();
    setIsPlaying(false);
  }, []);

  const startExercise = (ex: ListeningExercise) => {
    setExercise(ex);
    setPhase('exercise');
    setDictationIndex(0);
    setDictationAnswers(ex.sentences ? ex.sentences.map(() => '') : []);
    setDictationSubmitted(false);
    setGapAnswers(ex.gaps ? ex.gaps.map(() => '') : []);
    setGapSubmitted(false);
    setCompAnswers({});
    setCompSubmitted(false);
  };

  const handleBack = () => {
    stopSpeech();
    setPhase('list');
    setExercise(null);
  };

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  // ── SCORE CALCULATION ──
  const getScore = (): { correct: number; total: number } => {
    if (!exercise) return { correct: 0, total: 0 };
    if (exercise.type === 'dictation' && exercise.sentences) {
      const total = exercise.sentences.length;
      const correct = exercise.sentences.filter(
        (s, i) => normalize(s) === normalize(dictationAnswers[i] || '')
      ).length;
      return { correct, total };
    }
    if (exercise.type === 'gap-fill' && exercise.gaps) {
      const total = exercise.gaps.length;
      const correct = exercise.gaps.filter(
        (g, i) => g.toLowerCase().trim() === (gapAnswers[i] || '').toLowerCase().trim()
      ).length;
      return { correct, total };
    }
    if (exercise.type === 'comprehension' && exercise.questions) {
      const total = exercise.questions.length;
      const correct = exercise.questions.filter(
        (q, i) => compAnswers[i] === q.correctAnswer
      ).length;
      return { correct, total };
    }
    return { correct: 0, total: 0 };
  };

  // ── LIST VIEW ──
  if (phase === 'list') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Headphones className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.listening', uiLanguage)}</h1>
            <p className="text-gray-500 text-sm">Train your ear with text-to-speech exercises</p>
          </div>
        </div>

        {/* Level Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', ...levels] as const).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedLevel === level
                  ? 'bg-yellow-600 text-white'
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
                  <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{ex.title}</h4>
                    <p className="text-xs text-gray-400">{ex.topic} · {ex.duration} · {ex.type}</p>
                  </div>
                </div>
                <LevelBadge level={ex.level} size="sm" />
              </div>
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

  // ── RESULT VIEW ──
  if (phase === 'result') {
    const { correct, total } = getScore();
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ScoreCard score={correct} total={total} onRetry={() => startExercise(exercise)} />
        <button onClick={handleBack} className="mt-4 w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
          ← Back to exercises
        </button>
      </div>
    );
  }

  // ── EXERCISE VIEWS ──
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
        <p className="text-sm text-gray-500 capitalize">{exercise.type} exercise · {exercise.topic}</p>
      </div>

      {/* ── DICTATION ── */}
      {exercise.type === 'dictation' && exercise.sentences && (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            🎧 Listen to each sentence and type what you hear. Click play to hear it again.
          </div>
          {exercise.sentences.map((sentence, idx) => (
            <div key={idx} className={`bg-white rounded-xl p-4 border ${
              dictationSubmitted
                ? normalize(sentence) === normalize(dictationAnswers[idx] || '')
                  ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                : idx === dictationIndex ? 'border-yellow-300' : 'border-gray-100'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => { setDictationIndex(idx); speak(sentence, exercise.speechRate); }}
                  className="w-9 h-9 bg-yellow-100 hover:bg-yellow-200 rounded-full flex items-center justify-center transition flex-shrink-0"
                >
                  {isPlaying && dictationIndex === idx
                    ? <Pause className="w-4 h-4 text-yellow-700" />
                    : <Play className="w-4 h-4 text-yellow-700" />}
                </button>
                <span className="text-xs text-gray-400 font-medium">Sentence {idx + 1}</span>
              </div>
              <input
                type="text"
                value={dictationAnswers[idx] || ''}
                onChange={(e) => {
                  const next = [...dictationAnswers];
                  next[idx] = e.target.value;
                  setDictationAnswers(next);
                }}
                disabled={dictationSubmitted}
                placeholder="Type what you hear..."
                className="w-full p-3 rounded-lg border border-gray-200 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {dictationSubmitted && normalize(sentence) !== normalize(dictationAnswers[idx] || '') && (
                <p className="text-xs text-green-700 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Correct: <span className="font-medium">{sentence}</span>
                </p>
              )}
            </div>
          ))}
          {!dictationSubmitted ? (
            <button onClick={() => { setDictationSubmitted(true); stopSpeech(); }}
              className="w-full py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition">
              Check Answers
            </button>
          ) : (
            <button onClick={() => setPhase('result')}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
              See Results
            </button>
          )}
        </div>
      )}

      {/* ── GAP FILL ── */}
      {exercise.type === 'gap-fill' && exercise.gapText && exercise.gaps && (() => {
        const gaps = exercise.gaps!;
        return (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
              🎧 Listen to the passage, then fill in the missing words.
            </div>
            <div className="flex gap-3">
              <button onClick={() => speak(exercise.transcript, exercise.speechRate)}
                className="flex items-center gap-2 px-5 py-3 bg-yellow-100 text-yellow-800 rounded-xl font-medium hover:bg-yellow-200 transition">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Playing...' : 'Play Audio'}
              </button>
              {isPlaying && (
                <button onClick={stopSpeech} className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition">
                  <RotateCcw className="w-4 h-4" /> Stop
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 leading-relaxed text-gray-700">
              {exercise.gapText!.split(/___(\d+)___/).map((part, i) => {
                if (i % 2 === 0) return <span key={i}>{part}</span>;
                const gIdx = parseInt(part) - 1;
                const isOk = gapSubmitted && gaps[gIdx]?.toLowerCase().trim() === (gapAnswers[gIdx] || '').toLowerCase().trim();
                const isBad = gapSubmitted && !isOk;
                return (
                  <span key={i} className="inline-block mx-1">
                    <input type="text" value={gapAnswers[gIdx] || ''}
                      onChange={(e) => { const n = [...gapAnswers]; n[gIdx] = e.target.value; setGapAnswers(n); }}
                      disabled={gapSubmitted}
                      className={`w-28 px-2 py-1 border-b-2 text-center text-sm font-medium focus:outline-none ${
                        isOk ? 'border-green-500 text-green-700 bg-green-50' :
                        isBad ? 'border-red-500 text-red-700 bg-red-50' : 'border-gray-300 text-gray-700'
                      }`} placeholder={`(${gIdx + 1})`} />
                    {isBad && <span className="text-xs text-green-600 ml-1">({gaps[gIdx]})</span>}
                  </span>
                );
              })}
            </div>
            {!gapSubmitted ? (
              <button onClick={() => { setGapSubmitted(true); stopSpeech(); }}
                className="w-full py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition">
                Check Answers
              </button>
            ) : (
              <button onClick={() => setPhase('result')}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
                See Results
              </button>
            )}
          </div>
        );
      })()}

      {/* ── COMPREHENSION ── */}
      {exercise.type === 'comprehension' && exercise.questions && (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            🎧 Listen to the passage carefully, then answer the questions.
          </div>
          <div className="flex gap-3">
            <button onClick={() => speak(exercise.transcript, exercise.speechRate)}
              className="flex items-center gap-2 px-5 py-3 bg-yellow-100 text-yellow-800 rounded-xl font-medium hover:bg-yellow-200 transition">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Playing...' : 'Play Audio'}
            </button>
            {isPlaying && (
              <button onClick={stopSpeech} className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition">
                <RotateCcw className="w-4 h-4" /> Stop
              </button>
            )}
          </div>
          {exercise.questions.map((q, idx) => {
            const sel = compAnswers[idx];
            const ok = compSubmitted && sel === q.correctAnswer;
            const bad = compSubmitted && sel !== q.correctAnswer;
            return (
              <div key={idx} className={`bg-white rounded-xl p-5 border ${ok ? 'border-green-300 bg-green-50' : bad ? 'border-red-300 bg-red-50' : 'border-gray-100'}`}>
                <p className="font-medium text-gray-800 mb-3">{idx + 1}. {q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                      compSubmitted && opt === q.correctAnswer ? 'border-green-400 bg-green-50' :
                      compSubmitted && sel === opt && opt !== q.correctAnswer ? 'border-red-400 bg-red-50' :
                      sel === opt ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input type="radio" name={`comp-${idx}`} value={opt} checked={sel === opt}
                        disabled={compSubmitted} onChange={() => setCompAnswers({ ...compAnswers, [idx]: opt })}
                        className="accent-yellow-600" />
                      <span className="text-sm text-gray-700">{opt}</span>
                      {compSubmitted && opt === q.correctAnswer && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                      {compSubmitted && sel === opt && opt !== q.correctAnswer && <XCircle className="w-4 h-4 text-red-500 ml-auto" />}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
          {!compSubmitted ? (
            <button onClick={() => { setCompSubmitted(true); stopSpeech(); }}
              disabled={Object.keys(compAnswers).length < (exercise.questions?.length ?? 0)}
              className="w-full py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
              Check Answers
            </button>
          ) : (
            <button onClick={() => setPhase('result')}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
              See Results
            </button>
          )}
        </div>
      )}
    </div>
  );
}
