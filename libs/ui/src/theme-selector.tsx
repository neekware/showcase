'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import {
  mdiCheckCircle,
  mdiCircle,
  mdiMonitor,
  mdiPalette,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@mdi/js';
import { Icon } from '@mdi/react';
import { type Theme } from '@repo/dto';
import { cn, useThemeState } from '@repo/util';
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@repo/vendor-ui';

interface ThemeSelectorProps {
  themes: Theme[];
  className?: string;
}

export function ThemeSelector({ themes, className }: ThemeSelectorProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className="md:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 items-center justify-center rounded-full"
            >
              <div className="text-primary">
                <Icon path={mdiPalette} size={1} />
              </div>
              <span className="sr-only">Customize theme</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-50 mt-3 w-[360px] rounded-[--radius]  p-4 "
          >
            <Selector themes={themes} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function Selector({ themes }: ThemeSelectorProps) {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme: setMode, theme: mode = 'system' } = useTheme();
  const [theme, setThemeState] = useThemeState();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto flex flex-col space-y-4 md:space-y-6">
      <div className="flex items-start">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize color and mode
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((nextTheme) => {
              const isActive = nextTheme.name === theme.name;

              return mounted ? (
                <Button
                  variant="outline"
                  size="sm"
                  key={nextTheme.name}
                  onClick={() => {
                    setThemeState({
                      ...theme,
                      name: nextTheme.name,
                    });
                  }}
                  className={cn(
                    'justify-start',
                    isActive && 'border-primary border-2'
                  )}
                >
                  {isActive ? (
                    <Icon
                      path={mdiCheckCircle}
                      className=" mr-1 h-6 w-6"
                      color={`hsl(${
                        nextTheme.activeColor[
                          mode === 'dark' ? 'dark' : 'light'
                        ]
                      })`}
                    />
                  ) : (
                    <Icon
                      path={mdiCircle}
                      className="mr-1 h-6 w-6"
                      color={`hsl(${
                        nextTheme.activeColor[
                          mode === 'dark' ? 'dark' : 'light'
                        ]
                      })`}
                    />
                  )}
                  {nextTheme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={nextTheme.name} />
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMode('light');
                  }}
                  className={cn(mode === 'light' && 'border-primary border-2')}
                >
                  <Icon
                    path={mdiWeatherSunny}
                    className="mr-1 h-6 w-6 -translate-x-1"
                  />
                  Light
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMode('dark');
                  }}
                  className={cn(mode === 'dark' && 'border-primary border-2')}
                >
                  <Icon
                    path={mdiWeatherNight}
                    className="mr-1 h-6 w-6 -translate-x-1"
                  />
                  Dark
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMode('system');
                  }}
                  className={cn(mode === 'system' && 'border-primary border-2')}
                >
                  <Icon
                    path={mdiMonitor}
                    className="mr-1 h-6 w-6 -translate-x-1"
                  />
                  System
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
