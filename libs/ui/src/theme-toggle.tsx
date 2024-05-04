'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Button } from '@repo/vendor-ui';

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="text-primary relative w-9 px-0">
      {theme === 'dark' ? (
        <Button variant="link" onClick={toggleTheme}>
          <Icon path={mdiWeatherSunny} className="h-6 w-6" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Button variant="link" onClick={toggleTheme}>
          <Icon path={mdiWeatherNight} className="h-6 w-6" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </div>
  );
}
