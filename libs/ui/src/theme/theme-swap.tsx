'use client';

import * as React from 'react';
import { useThemeState } from '@repo/util';

export function ThemeSwap() {
  const [theme] = useThemeState();

  React.useEffect(() => {
    document.body.classList.forEach((className) => {
      if (/^theme-*/.exec(className)) {
        document.body.classList.remove(className);
      }
    });

    const nextTheme = theme.name;
    document.body.classList.add(`theme-${nextTheme}`);
  }, [theme]);

  return null;
}
