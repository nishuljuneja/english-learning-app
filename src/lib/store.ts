import { create } from 'zustand';
import { type User } from 'firebase/auth';
import { type UserProfile, type CEFRLevel, getUserProfile } from './firestore';
import { type SupportedLanguage } from './i18n';
import { onAuthChange } from './auth';

interface AppState {
  // Auth
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;

  // UI
  uiLanguage: SupportedLanguage;
  sidebarOpen: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setUILanguage: (lang: SupportedLanguage) => void;
  toggleSidebar: () => void;
  refreshProfile: () => Promise<void>;
  initAuth: () => () => void; // returns unsubscribe function
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  uiLanguage: 'en',
  sidebarOpen: false,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setUILanguage: (lang) => {
    set({ uiLanguage: lang });
    if (typeof window !== 'undefined') {
      localStorage.setItem('uiLanguage', lang);
    }
  },
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  refreshProfile: async () => {
    const { user } = get();
    if (user) {
      const fresh = await getUserProfile(user.uid);
      if (fresh) set({ profile: fresh });
    }
  },

  initAuth: () => {
    // Restore language preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('uiLanguage') as SupportedLanguage | null;
      if (saved) set({ uiLanguage: saved });
    }

    const unsubscribe = onAuthChange(async (user) => {
      set({ user, loading: true });
      if (user) {
        let profile = await getUserProfile(user.uid);
        // If user exists in Auth but has no Firestore profile, create one
        if (!profile) {
          const { createUserProfile } = await import('./firestore');
          const { Timestamp } = await import('firebase/firestore');
          await createUserProfile({
            uid: user.uid,
            displayName: user.displayName || 'Learner',
            email: user.email || '',
            nativeLanguage: 'en',
            currentLevel: 'A1',
            xp: 0,
            streak: 0,
            lastActiveDate: new Date().toISOString().split('T')[0],
            createdAt: Timestamp.now(),
            skillScores: {
              vocabulary: 0,
              grammar: 0,
              reading: 0,
              listening: 0,
              writing: 0,
              speaking: 0,
            },
            lessonsCompleted: 0,
            wordsLearned: 0,
            placementTestCompleted: false,
            emailReminders: true,
          });
          profile = await getUserProfile(user.uid);
        }
        set({ profile, loading: false });
        if (profile?.nativeLanguage) {
          set({ uiLanguage: profile.nativeLanguage });
        }
      } else {
        set({ profile: null, loading: false });
      }
    });

    return unsubscribe;
  },
}));
