import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  increment,
  Timestamp,
  orderBy,
  limit,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

// ==================== TYPES ====================

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type SkillType = 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'writing' | 'speaking';

export type SupportedLanguage =
  | 'hi' | 'ta' | 'te' | 'bn' | 'mr'
  | 'kn' | 'ml' | 'gu' | 'pa' | 'od' | 'en';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  nativeLanguage: SupportedLanguage;
  currentLevel: CEFRLevel;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  createdAt: Timestamp;
  skillScores: Record<SkillType, number>; // 0-100 per skill
  lessonsCompleted: number;
  wordsLearned: number;
  placementTestCompleted: boolean;
  emailReminders?: boolean; // opt-in daily streak email
}

export interface VocabularyWord {
  id: string;
  word: string;
  meaning: Record<SupportedLanguage, string>;
  partOfSpeech: string;
  level: CEFRLevel;
  example: string;
  exampleTranslation: Record<SupportedLanguage, string>;
  pronunciation: string; // IPA
  audioUrl?: string;
  imageUrl?: string;
  tags: string[]; // e.g., ['daily-life', 'work', 'travel']
  oxfordList: 'A' | 'B'; // Which Oxford list it belongs to
}

export interface UserVocabularyProgress {
  wordId: string;
  userId: string;
  level: number; // SM-2 repetition level (0-5)
  easeFactor: number; // SM-2 ease factor
  interval: number; // days until next review
  nextReviewDate: string; // YYYY-MM-DD
  totalReviews: number;
  correctReviews: number;
  lastReviewedAt: Timestamp;
}

export interface GrammarLesson {
  id: string;
  level: CEFRLevel;
  title: string;
  titleTranslations: Record<SupportedLanguage, string>;
  description: string;
  descriptionTranslations: Record<SupportedLanguage, string>;
  order: number;
  content: GrammarContent;
  exercises: GrammarExercise[];
}

export interface GrammarContent {
  explanation: string;
  explanationTranslations: Record<SupportedLanguage, string>;
  examples: {
    english: string;
    translations: Record<SupportedLanguage, string>;
    highlight: string; // The grammar point highlighted
  }[];
  tips: {
    text: string;
    translations: Record<SupportedLanguage, string>;
  }[];
}

export interface GrammarExercise {
  id: string;
  type: 'fill-blank' | 'multiple-choice' | 'reorder' | 'correct-error' | 'translate';
  question: string;
  questionTranslations?: Record<SupportedLanguage, string>;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  explanationTranslations: Record<SupportedLanguage, string>;
}

export interface ReadingPassage {
  id: string;
  level: CEFRLevel;
  title: string;
  content: string;
  wordCount: number;
  topic: string;
  indianContext: boolean; // True if set in Indian context
  questions: ReadingQuestion[];
  vocabulary: string[]; // Key words to pre-teach
}

export interface ReadingQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  questionTranslations: Record<SupportedLanguage, string>;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface UserLessonProgress {
  lessonId: string;
  lessonType: 'grammar' | 'reading' | 'vocabulary';
  userId: string;
  completed: boolean;
  score: number; // 0-100
  attempts: number;
  bestScore: number;
  completedAt?: Timestamp;
  timeSpentSeconds: number;
}

export interface PlacementTestResult {
  userId: string;
  answers: { questionId: string; answer: string; correct: boolean }[];
  score: number;
  assignedLevel: CEFRLevel;
  completedAt: Timestamp;
}

// ==================== FIRESTORE OPERATIONS ====================

// User Profile
export async function createUserProfile(profile: UserProfile): Promise<void> {
  await setDoc(doc(db, 'users', profile.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docSnap = await getDoc(doc(db, 'users', uid));
  return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  await updateDoc(doc(db, 'users', uid), data as DocumentData);
}

export async function addXP(uid: string, amount: number): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    xp: increment(amount),
  });
}

export async function updateStreak(uid: string): Promise<{ streak: number; lastActiveDate: string }> {
  const profile = await getUserProfile(uid);
  if (!profile) return { streak: 0, lastActiveDate: new Date().toISOString().split('T')[0] };

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (profile.lastActiveDate === today) return { streak: profile.streak, lastActiveDate: today };

  const newStreak = profile.lastActiveDate === yesterday ? profile.streak + 1 : 1;
  await updateDoc(doc(db, 'users', uid), {
    streak: newStreak,
    lastActiveDate: today,
  });
  return { streak: newStreak, lastActiveDate: today };
}

export async function incrementWordsLearned(uid: string, count: number = 1): Promise<void> {
  await updateDoc(doc(db, 'users', uid), {
    wordsLearned: increment(count),
  });
}

// Vocabulary Progress (Spaced Repetition)
export async function getVocabularyProgress(
  userId: string,
  wordId: string
): Promise<UserVocabularyProgress | null> {
  const docSnap = await getDoc(doc(db, 'users', userId, 'vocabularyProgress', wordId));
  return docSnap.exists() ? (docSnap.data() as UserVocabularyProgress) : null;
}

export async function updateVocabularyProgress(
  userId: string,
  wordId: string,
  quality: number // 0-5 rating of recall quality
): Promise<void> {
  const progress = await getVocabularyProgress(userId, wordId);
  const now = Timestamp.now();

  if (!progress) {
    // First time seeing this word
    const newProgress: UserVocabularyProgress = {
      wordId,
      userId,
      level: quality >= 3 ? 1 : 0,
      easeFactor: 2.5,
      interval: quality >= 3 ? 1 : 0,
      nextReviewDate: quality >= 3
        ? new Date(Date.now() + 86400000).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      totalReviews: 1,
      correctReviews: quality >= 3 ? 1 : 0,
      lastReviewedAt: now,
    };
    await setDoc(doc(db, 'users', userId, 'vocabularyProgress', wordId), newProgress);
    return;
  }

  // SM-2 Algorithm
  let { easeFactor, interval, level } = progress;

  if (quality >= 3) {
    // Correct response
    if (level === 0) interval = 1;
    else if (level === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    level++;
  } else {
    // Incorrect - reset
    level = 0;
    interval = 0;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const nextReviewDate = new Date(Date.now() + interval * 86400000)
    .toISOString()
    .split('T')[0];

  await updateDoc(doc(db, 'users', userId, 'vocabularyProgress', wordId), {
    level,
    easeFactor,
    interval,
    nextReviewDate,
    totalReviews: increment(1),
    correctReviews: quality >= 3 ? increment(1) : progress.correctReviews,
    lastReviewedAt: now,
  });
}

export async function getDueVocabulary(userId: string): Promise<UserVocabularyProgress[]> {
  const today = new Date().toISOString().split('T')[0];
  const q = query(
    collection(db, 'users', userId, 'vocabularyProgress'),
    where('nextReviewDate', '<=', today),
    orderBy('nextReviewDate'),
    limit(20)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as UserVocabularyProgress);
}

// Lesson Progress
export async function saveLessonProgress(
  userId: string,
  progress: UserLessonProgress
): Promise<void> {
  const docId = `${progress.lessonType}_${progress.lessonId}`;
  const existing = await getDoc(doc(db, 'users', userId, 'lessonProgress', docId));

  if (existing.exists()) {
    const prev = existing.data() as UserLessonProgress;
    await updateDoc(doc(db, 'users', userId, 'lessonProgress', docId), {
      score: progress.score,
      attempts: increment(1),
      bestScore: Math.max(prev.bestScore, progress.score),
      completed: progress.score >= 70 || prev.completed,
      completedAt: progress.score >= 70 ? serverTimestamp() : prev.completedAt,
      timeSpentSeconds: increment(progress.timeSpentSeconds),
    });
  } else {
    await setDoc(doc(db, 'users', userId, 'lessonProgress', docId), {
      ...progress,
      completed: progress.score >= 70,
      completedAt: progress.score >= 70 ? serverTimestamp() : null,
      attempts: 1,
      bestScore: progress.score,
    });
  }
}

export async function getLessonProgress(
  userId: string,
  lessonType: string,
  lessonId: string
): Promise<UserLessonProgress | null> {
  const docId = `${lessonType}_${lessonId}`;
  const docSnap = await getDoc(doc(db, 'users', userId, 'lessonProgress', docId));
  return docSnap.exists() ? (docSnap.data() as UserLessonProgress) : null;
}

// Placement Test
export async function savePlacementResult(result: PlacementTestResult): Promise<void> {
  await setDoc(doc(db, 'placementResults', result.userId), {
    ...result,
    completedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, 'users', result.userId), {
    currentLevel: result.assignedLevel,
    placementTestCompleted: true,
  });
}

// Leaderboard
export async function getLeaderboard(limitCount: number = 20): Promise<UserProfile[]> {
  const q = query(
    collection(db, 'users'),
    orderBy('xp', 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => d.data() as UserProfile);
}

// Game score types/functions moved to ./game-firestore.ts
export type { GameScore } from './game-firestore';
