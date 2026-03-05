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

  initAuth: () => {
    // Restore language preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('uiLanguage') as SupportedLanguage | null;
      if (saved) set({ uiLanguage: saved });
    }

    const unsubscribe = onAuthChange(async (user) => {
      set({ user, loading: true });
      if (user) {
        const profile = await getUserProfile(user.uid);
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
