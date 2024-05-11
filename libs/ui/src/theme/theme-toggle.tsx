'use client';

import * as React from 'react';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { Icon } from '@mdi/react';
import { cn, useThemeState } from '@repo/util';
import { Button } from '@repo/vendor-ui';

interface ThemeModeToggleProps {
  className?: string;
}

export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const [theme, setThemeState] = useThemeState();

  const toggleTheme = () => {
    setThemeState({ mode: theme.mode === 'dark' ? 'light' : 'dark' });
  };

  return (
    <div className={cn('text-primary relative w-9 px-0', className)}>
      <Button
        onClick={toggleTheme}
        variant="ghost"
        className="flex size-8 items-center justify-center rounded-full"
      >
        <div className="text-primary">
          <Icon
            path={theme.mode === 'dark' ? mdiWeatherSunny : mdiWeatherNight}
            size={1}
          />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
