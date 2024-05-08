import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAtom } from 'jotai';
import { APP_STATE_NAME, type AppState } from '@repo/dto';
import { appStateAtom, DefaultStateSettings, isSystemTheme } from '@repo/util';

export function AppInitComponent() {
  const [state, setAppState] = useAtom(appStateAtom);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    appStateStorageInit(setAppState, state);

    const debounceId = setTimeout(() => {
      console.log('1', state.theme, theme);
      if (state.theme.mode !== theme) {
        setTheme(state.theme.mode ?? 'dark');
        console.log('2', state.theme, theme);
      }
    }, 300);

    return () => {
      clearTimeout(debounceId);
    };
  }, [state]); // keep the theme mode in app state, give it to auth-theme on change

  // useEffect(() => {
  //   appStateStorageInit(setAppState, state);
  // }, []); // run once on start

  return null; // This component does not render anything
}

function appStateStorageInit(
  setAppState: (state: AppState) => void,
  state?: AppState
) {
  const storedState = localStorage.getItem(APP_STATE_NAME);
  if (!storedState) {
    const mode = isSystemTheme();
    setAppState({
      ...DefaultStateSettings,
      ...(state ?? {}),
      ...{
        theme: { ...DefaultStateSettings.theme, mode },
      },
    });
  }
}
