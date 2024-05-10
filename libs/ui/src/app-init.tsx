'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAtom } from 'jotai';
import { appStateAtom, setThemeMode, stateStorageInit } from '@repo/util';

export function AppInitComponent() {
  const [state, setAppState] = useAtom(appStateAtom);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (state.theme.mode !== theme) {
      setThemeMode(state.theme.mode);
      setTheme(state.theme.mode as string);
    }

    const debounceId = setTimeout(() => {
      stateStorageInit(setAppState);
    }, 1);

    return () => {
      clearTimeout(debounceId);
    };
  }, [state]);

  return null; // This component does not render anything
}
