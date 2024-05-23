'use client';

import * as React from 'react';
import { useThemeState } from '@repo/util';

export function ThemeSwap(): null {
  const [theme] = useThemeState();

  React.useEffect(() => {
    Array.from(document.body.classList)
      .filter((className) => className.startsWith('theme-'))
      .forEach((className) => {
        document.body.classList.remove(className);
      });

    const nextTheme = theme.name;
    document.body.classList.add(`theme-${nextTheme}`);
  }, [theme]);

  return null;
}
