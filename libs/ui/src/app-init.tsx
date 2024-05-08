import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { APP_STATE_NAME } from '@repo/dto';
import { appStateAtom, DefaultStateSettings, isSystemTheme } from '@repo/util';

export function AppInitComponent() {
  const [_, setAppState] = useAtom(appStateAtom);

  useEffect(() => {
    const storedState = localStorage.getItem(APP_STATE_NAME);
    if (!storedState) {
      const mode = isSystemTheme();
      setAppState(DefaultStateSettings);
      localStorage.setItem(
        APP_STATE_NAME,
        JSON.stringify({
          ...DefaultStateSettings,
          ...{
            theme: { ...DefaultStateSettings.theme, mode },
          },
        })
      );
    }
  }); // Dependency array is empty to ensure this runs only once on mount

  return null; // This component does not render anything
}
