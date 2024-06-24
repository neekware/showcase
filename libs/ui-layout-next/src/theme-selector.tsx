'use client';

import * as React from 'react';
import { type Theme } from '@lib/data-model-shared';
import { useAppState } from '@lib/data-store-next';
import {
  Icon,
  mdiCheckCircle,
  mdiCircle,
  mdiMonitor,
  mdiPalette,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@lib/ui-icon-next';
import { cn } from '@lib/ui-util-next';
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@lib/ui-vendor-next';

interface ThemeSelectorProps {
  themes: Theme[];
  name?: string;
  className?: string;
}

export function ThemeSelector({ themes, name, className }: ThemeSelectorProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <div className="md:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-none px-2 hover:bg-transparent"
            >
              <div className="text-primary hover:text-foreground/80 h-full rounded-full">
                <Icon path={mdiPalette} size={1} />
              </div>
              {name ? (
                <div className="capitalize">{name}</div>
              ) : (
                <span className="sr-only">Customize theme</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-50 mx-2 mt-3 min-w-[340px] rounded-[--radius] p-4"
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
  const [state, setAppState] = useAppState();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto flex flex-col space-y-4 md:space-y-6">
      <div className="flex items-start">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">Customize color and mode</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((nextTheme) => {
              const isActive = nextTheme.name === state.name;

              return mounted ? (
                <Button
                  variant="outline"
                  key={nextTheme.name}
                  onClick={() => {
                    setAppState({ name: nextTheme.name });
                  }}
                  className={cn('justify-start px-1', isActive && 'border-primary border-2')}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div>
                      {isActive ? (
                        <Icon path={mdiCheckCircle} className="text-primary mr-1 size-6" />
                      ) : (
                        <Icon
                          path={mdiCircle}
                          className="size-6"
                          color={`${nextTheme.activeColor[state.mode === 'dark' ? 'dark' : 'light']}`}
                        />
                      )}
                    </div>
                    <div>{nextTheme.label}</div>
                  </div>
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={nextTheme.name} />
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="py2 grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAppState({ mode: 'light' });
                  }}
                  className={cn(state.mode === 'light' && 'border-primary border-2')}
                >
                  <Icon path={mdiWeatherSunny} className="size-6 -translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAppState({ mode: 'system' });
                  }}
                  className={cn(state.mode === 'system' && 'border-primary border-2')}
                >
                  <Icon path={mdiMonitor} className="size-6 -translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAppState({ mode: 'dark' });
                  }}
                  className={cn(state.mode === 'dark' && 'border-primary border-2')}
                >
                  <Icon path={mdiWeatherNight} className="size-6 -translate-x-1" />
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
