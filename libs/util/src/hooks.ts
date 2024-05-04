import { useAtom } from 'jotai';
import { DefaultStateSettings, type ThemeType, themeAtom } from './state';

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
