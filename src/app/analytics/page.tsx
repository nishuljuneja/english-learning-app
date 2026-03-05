'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { ProgressBar, LevelBadge } from '@/components/Exercises';
import {
  BarChart3, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
  BookOpen, Brain, Headphones, MessageSquare, PenTool, ArrowRight,
  Target, Lightbulb, ChevronRight, Sparkles,
} from 'lucide-react';
import type { SkillType } from '@/lib/firestore';

// ─── Skill analysis logic ─────────────────────────────────────────
interface SkillAnalysis {
  key: SkillType;
  label: string;
  score: number;
  icon: React.ElementType;
  color: string;
  bg: string;
  href: string;
  status: 'strong' | 'moderate' | 'weak';
  tips: string[];
}

function analyzeSkill(
  key: SkillType,
  score: number,
  label: string,
  icon: React.ElementType,
  color: string,
  bg: string,
  href: string
): SkillAnalysis {
  const status = score >= 70 ? 'strong' : score >= 40 ? 'moderate' : 'weak';

  const tipsBySkill: Record<SkillType, Record<'strong' | 'moderate' | 'weak', string[]>> = {
    vocabulary: {
      strong: ['Keep reviewing with spaced repetition', 'Try learning C1-level words'],
      moderate: ['Practice fill-in-the-blank exercises daily', 'Use flashcards for 10 minutes/day'],
      weak: ['Start with A1 vocabulary flashcards', 'Learn 5 new words every day', 'Use the Review mode to retain words'],
    },
    grammar: {
      strong: ['Focus on advanced grammar patterns', 'Practice writing to apply grammar rules'],
      moderate: ['Review lessons you scored below 70%', 'Do grammar exercises for 15 min/day'],
      weak: ['Start from A1 grammar basics', 'Complete one grammar lesson per day', 'Focus on verb tenses first'],
    },
    reading: {
      strong: ['Read B2/C1 level passages', 'Practice speed reading techniques'],
      moderate: ['Read passages at your level daily', 'Focus on understanding main ideas first'],
      weak: ['Begin with A1 short passages', 'Read slowly and answer questions', 'Look up unknown words as you read'],
    },
    listening: {
      strong: ['Challenge yourself with faster speech', 'Try listening without subtitles'],
      moderate: ['Listen to exercises twice before answering', 'Practice with Indian English accents'],
      weak: ['Start with slow, clear audio at A1 level', 'Listen and repeat sentences', 'Use the speaker button on vocabulary cards'],
    },
    writing: {
      strong: ['Practice essay-length responses', 'Focus on formal/academic writing'],
      moderate: ['Write short paragraphs daily', 'Pay attention to grammar feedback'],
      weak: ['Start with simple sentences', 'Copy and modify example sentences', 'Use the writing prompts at A1 level'],
    },
    speaking: {
      strong: ['Practice debating topics', 'Record yourself and self-evaluate'],
      moderate: ['Practice describing pictures and events', 'Speak for 2 minutes on a topic daily'],
      weak: ['Start with reading sentences aloud', 'Practice basic introductions', 'Use speech exercises at A1 level'],
    },
  };

  return { key, label, score, icon, color, bg, href, status, tips: tipsBySkill[key][status] };
}

const statusColors = {
  strong: { label: 'Strong', textColor: 'text-green-700', bgColor: 'bg-green-100', borderColor: 'border-green-300', icon: CheckCircle2 },
  moderate: { label: 'Moderate', textColor: 'text-amber-700', bgColor: 'bg-amber-100', borderColor: 'border-amber-300', icon: TrendingUp },
  weak: { label: 'Needs Work', textColor: 'text-red-700', bgColor: 'bg-red-100', borderColor: 'border-red-300', icon: AlertTriangle },
};

export default function AnalyticsPage() {
  const { profile, uiLanguage, loading, refreshProfile } = useAppStore();

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view analytics</h1>
        <Link href="/login" className="text-indigo-600 font-medium hover:underline">
          {t('common.login', uiLanguage)} →
        </Link>
      </div>
    );
  }

  const skills: SkillAnalysis[] = [
    analyzeSkill('vocabulary', profile.skillScores.vocabulary, 'Vocabulary', BookOpen, 'text-blue-600', 'bg-blue-100', '/vocabulary'),
    analyzeSkill('grammar', profile.skillScores.grammar, 'Grammar', Brain, 'text-purple-600', 'bg-purple-100', '/grammar'),
    analyzeSkill('reading', profile.skillScores.reading, 'Reading', BookOpen, 'text-green-600', 'bg-green-100', '/reading'),
    analyzeSkill('listening', profile.skillScores.listening, 'Listening', Headphones, 'text-orange-600', 'bg-orange-100', '/listening'),
    analyzeSkill('writing', profile.skillScores.writing, 'Writing', PenTool, 'text-pink-600', 'bg-pink-100', '/writing'),
    analyzeSkill('speaking', profile.skillScores.speaking, 'Speaking', MessageSquare, 'text-teal-600', 'bg-teal-100', '/speaking'),
  ];

  const weakSkills = skills.filter(s => s.status === 'weak');
  const moderateSkills = skills.filter(s => s.status === 'moderate');
  const strongSkills = skills.filter(s => s.status === 'strong');
  const overallScore = Math.round(skills.reduce((sum, s) => sum + s.score, 0) / skills.length);
  const weakestSkill = skills.reduce((w, s) => s.score < w.score ? s : w, skills[0]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Weak Areas & Analytics</h1>
          <p className="text-gray-500 text-sm">Personalized insights to improve faster</p>
        </div>
      </div>

      {/* Overall summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-1">{overallScore}%</div>
          <p className="text-sm text-gray-500">Overall Score</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <div className="text-4xl font-bold text-green-600 mb-1">{strongSkills.length}</div>
          <p className="text-sm text-gray-500">Strong Skills</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
          <div className="text-4xl font-bold text-red-500 mb-1">{weakSkills.length}</div>
          <p className="text-sm text-gray-500">Skills to Improve</p>
        </div>
      </div>

      {/* Priority recommendation */}
      {weakestSkill && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">Focus Area: {weakestSkill.label}</h3>
              <p className="text-sm text-gray-600 mb-3">
                Your {weakestSkill.label.toLowerCase()} score is {weakestSkill.score}%.
                {weakestSkill.score === 0
                  ? " You haven't started this skill yet — begin today!"
                  : ' Focused practice here will have the biggest impact on your overall progress.'}
              </p>
              <Link
                href={weakestSkill.href}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition"
              >
                Practice {weakestSkill.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Skill-by-skill breakdown */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Skill-by-Skill Analysis
        </h2>

        {skills.map((skill) => {
          const Icon = skill.icon;
          const st = statusColors[skill.status];
          const StatusIcon = st.icon;

          return (
            <div
              key={skill.key}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 ${skill.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${skill.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{skill.label}</h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${st.bgColor} ${st.textColor}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {st.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${
                        skill.score >= 70 ? 'bg-green-500' : skill.score >= 40 ? 'bg-amber-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{skill.score}%</p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gray-50 rounded-xl p-4 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">Tips to improve</span>
                </div>
                <ul className="space-y-1.5">
                  {skill.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice link */}
              <Link
                href={skill.href}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
              >
                Practice {skill.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Balanced learning advice */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Balanced Learning Strategy</h3>
        <p className="text-white/80 text-sm mb-4">
          {weakSkills.length === 0
            ? "Great job! All your skills are developing well. Keep practicing to maintain your scores."
            : weakSkills.length <= 2
              ? `Focus on ${weakSkills.map(s => s.label).join(' and ')} to balance your profile. Just 15 minutes a day will make a big difference.`
              : "You have several skills to work on. Start with one skill at a time — consistency matters more than coverage!"}
        </p>
        <Link
          href="/daily-practice"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition"
        >
          <Sparkles className="w-4 h-4" /> Start Daily Practice
        </Link>
      </div>
    </div>
  );
}
