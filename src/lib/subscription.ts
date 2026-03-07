import type { UserProfile } from './firestore';

/**
 * Check if user has an active Pro subscription
 */
export function isPro(profile: UserProfile | null): boolean {
  if (!profile) return false;
  if (profile.subscriptionTier !== 'pro') return false;
  if (!profile.subscriptionExpiry) return false;
  const today = new Date().toISOString().split('T')[0];
  return profile.subscriptionExpiry >= today;
}

/**
 * CEFR levels available for free tier
 */
export const FREE_LEVELS = new Set(['A1', 'A2']);

/**
 * Check if a level is accessible for the user
 */
export function isLevelAccessible(level: string, profile: UserProfile | null): boolean {
  if (isPro(profile)) return true;
  return FREE_LEVELS.has(level);
}

/**
 * Skills available in free tier
 */
export const FREE_SKILLS = new Set(['vocabulary', 'grammar']);

/**
 * Check if a skill type is accessible for the user
 */
export function isSkillAccessible(skill: string, profile: UserProfile | null): boolean {
  if (isPro(profile)) return true;
  return FREE_SKILLS.has(skill);
}

/**
 * Daily practice limit for free users
 */
export const FREE_DAILY_PRACTICE_LIMIT = 1;

/**
 * Get today's practice count from localStorage
 */
export function getDailyPracticeCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem('speakeasy-daily-practice');
    if (!raw) return 0;
    const data = JSON.parse(raw);
    return data.date === today ? data.count : 0;
  } catch {
    return 0;
  }
}

/**
 * Increment today's practice count
 */
export function incrementDailyPracticeCount(): void {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().split('T')[0];
  try {
    const raw = localStorage.getItem('speakeasy-daily-practice');
    const data = raw ? JSON.parse(raw) : { date: '', count: 0 };
    if (data.date !== today) {
      data.date = today;
      data.count = 1;
    } else {
      data.count += 1;
    }
    localStorage.setItem('speakeasy-daily-practice', JSON.stringify(data));
  } catch {}
}
