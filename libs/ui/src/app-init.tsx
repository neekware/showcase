import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAtom } from 'jotai';
import { APP_STATE_NAME, type AppState } from '@repo/dto';
import { appStateAtom, DefaultStateSettings, isSystemTheme } from '@repo/util';

export function AppInitComponent() {
  const [state, setAppState] = useAtom(appStateAtom);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    appStateStorageInit(setAppState);

    const debounceId = setTimeout(() => {
      if (state.theme.mode !== theme) {
        setTheme(state.theme.mode ?? 'system');
      }
    }, 300);

    return () => {
      clearTimeout(debounceId);
    };
  }, [state]); // keep the theme mode in app state, give it to auth-theme on change

  return null; // This component does not render anything
}

function appStateStorageInit(setAppState: (state: AppState) => void) {
  const storedState = localStorage.getItem(APP_STATE_NAME);
  if (!storedState) {
    const mode = isSystemTheme();
    setAppState({
      ...DefaultStateSettings,
      ...{
        theme: { ...DefaultStateSettings.theme, mode },
      },
    });
  }
}
