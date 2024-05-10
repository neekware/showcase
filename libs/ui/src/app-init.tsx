'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { appStateAtom, setThemeMode, stateStorageInit } from '@repo/util';

export function AppInitComponent() {
  const [state, setAppState] = useAtom(appStateAtom);

  useEffect(() => {
    setThemeMode(state.theme.mode);

    const debounceId = setTimeout(() => {
      stateStorageInit(setAppState);
    }, 1);

    return () => {
      clearTimeout(debounceId);
    };
  }, [state]);

  return null; // This component does not render anything
}
