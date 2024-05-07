'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { Icon } from '@mdi/react';
import { cn } from '@repo/util';
import { Button } from '@repo/vendor-ui';

interface ThemeModeToggleProps {
  className?: string;
}

export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const { theme = 'system', setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
            path={theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight}
            size={1}
          />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
