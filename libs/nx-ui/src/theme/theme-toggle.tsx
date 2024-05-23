'use client';

import * as React from 'react';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { Icon } from '@mdi/react';
import { cn, getSystemThemeMode, useThemeState } from '@repo/nx-util';
import { Button } from '@repo/vendor-ui';

interface ThemeModeToggleProps {
  className?: string;
}

export function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const [theme, setThemeState] = useThemeState();
  const [icon, setIcon] = React.useState<string>(mdiWeatherSunny);

  const toggleTheme = () => {
    let mode = theme.mode;
    if (!['light', 'dark'].includes(theme.mode as string)) {
      mode = getSystemThemeMode();
    }

    setThemeState({ ...theme, mode: mode === 'dark' ? 'light' : 'dark' });
  };

  React.useEffect(() => {
    let mode = theme.mode;
    if (mode === 'system') {
      mode = getSystemThemeMode();
    }
    setIcon(mode === 'dark' ? mdiWeatherSunny : mdiWeatherNight);
  }, [theme]);

  return (
    <div className={cn('text-primary relative w-9 px-0', className)}>
      <Button
        onClick={toggleTheme}
        variant="ghost"
        className="flex size-8 items-center justify-center rounded-full"
      >
        <div className="text-primary">
          <Icon path={icon} size={1} />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
