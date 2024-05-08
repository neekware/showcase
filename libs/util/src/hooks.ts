import { useAtom } from 'jotai';
import { type AppState, type ThemeType } from '@repo/dto';
import { appStateAtom, DefaultStateSettings, themeAtom } from './state';

export function useAppState() {
  const [state, setAppState] = useAtom(appStateAtom);

  const updateImmutable = (partialConfig: Partial<AppState>) => {
    setAppState({
      ...state,
      ...DefaultStateSettings,
      ...partialConfig,
    });
  };

  return [state, updateImmutable] as const;
}

export function useThemeState() {
  const [theme, setThemeState] = useAtom(themeAtom);

  const updateImmutable = (partialConfig: Partial<ThemeType>) => {
    setThemeState({
      ...DefaultStateSettings.theme,
      ...partialConfig,
    });
  };

  return [theme, updateImmutable] as const;
}
