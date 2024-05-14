'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAppStateStore } from '@repo/util';

export function AppInit() {
  const { appState } = useAppStateStore();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(appState.theme.mode as string);
    true;
  }, []);

  useEffect(() => {
    setTheme(appState.theme.mode as string);
  }, [appState.theme.mode]);

  return null;
}
