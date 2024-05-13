'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAppState } from '@repo/util';

export function AppInitComponent() {
  const { appState } = useAppState();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // appStateStorage(setAppState);
    const debounceId = setTimeout(() => {
      if (appState.theme.mode !== theme) {
        setTheme(appState.theme.mode ?? 'system');
      }
    }, 1);

    return () => {
      clearTimeout(debounceId);
    };
  }, [appState]); // keep the theme mode in app state, give it to auth-theme on change

  return null; // This component does not render anything
}
