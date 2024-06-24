'use client';

import * as React from 'react';
import { useAppState } from '@lib/data-store-next';

export function ThemeSwap(): null {
  const [state] = useAppState();

  React.useEffect(() => {
    Array.from(document.body.classList)
      .filter((className) => className.startsWith('theme-'))
      .forEach((className) => {
        document.body.classList.remove(className);
      });

    const nextTheme = state.name;
    document.body.classList.add(`theme-${nextTheme}`);
  }, [state]);

  return null;
}
