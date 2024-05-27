'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useAppState } from '@repo/nx-util';

export function AppInit(): null {
  const router = useRouter();
  const [state] = useAppState();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(state.theme.mode as string);
  }, [state.theme.mode]);

  useEffect(() => {
    if (state.auth.isLoggedIn) {
      router.push('/');
    }
  }, [state.auth]);

  return null;
}
