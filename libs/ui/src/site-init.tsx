'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAtom } from 'jotai';
import { appStateAtom, stateStorageInit } from '@repo/util';

export function AppInitComponent() {
  const [state, setAppState] = useAtom(appStateAtom);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    stateStorageInit(setAppState);
    const debounceId = setTimeout(() => {
      if (state.theme.mode !== theme) {
        setTheme(state.theme.mode ?? 'system');
      }
    }, 1);

    return () => {
      clearTimeout(debounceId);
    };
  }, [state]); // keep the theme mode in app state, give it to auth-theme on change

  return null; // This component does not render anything
}
