'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initAuth = useAppStore((state) => state.initAuth);

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => unsubscribe();
  }, [initAuth]);

  return <>{children}</>;
}
