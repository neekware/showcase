import { useAtom } from 'jotai';
import { type ThemeType } from '@repo/dto';
import { DefaultStateSettings, themeAtom } from './state';

export function useThemeState() {
  const [theme, setTheme] = useAtom(themeAtom);

  const updateImmutable = (partialConfig: Partial<ThemeType>) => {
    setTheme({
      ...DefaultStateSettings.theme,
      ...partialConfig,
    });
  };

  return [theme, updateImmutable] as const;
}
