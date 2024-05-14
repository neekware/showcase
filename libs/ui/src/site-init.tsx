'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAppState } from '@repo/util';

export function AppInit() {
  const [state] = useAppState();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(state.theme.mode as string);
  }, [state.theme.mode]);

  return null;
}
