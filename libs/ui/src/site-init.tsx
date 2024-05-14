'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAppStateStore } from '@repo/util';

export function AppInitComponent() {
  const { appState } = useAppStateStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const debounceId = setTimeout(() => {
      if (appState.theme.mode !== theme) {
        setTheme(appState.theme.mode ?? 'system');
      }
    }, 1);

    return () => {
      clearTimeout(debounceId);
    };
  }, [appState]);

  return null;
}
