import { useAtom } from 'jotai';
import { type AppState, type ThemeType } from '@repo/dto';
import { signObject } from './crypto';
import {
  appStateAtom,
  authAtom,
  DefaultStateSettings,
  profileAtom,
  themeAtom,
} from './state';

export function useAppState() {
  const [state, setAppState] = useAtom(appStateAtom);

  const updateImmutable = (partialConfig: Partial<AppState>) => {
    setAppState(
      signObject<AppState>({
        ...DefaultStateSettings,
        ...state,
        ...partialConfig,
      })
    );
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

export function useAuthState() {
  const [auth, setAuthState] = useAtom(authAtom);

  const updateImmutable = (partialConfig: Partial<ThemeType>) => {
    setAuthState({
      ...DefaultStateSettings.auth,
      ...partialConfig,
    });
  };

  return [auth, updateImmutable] as const;
}

export function useProfileState() {
  const [profile, setAuthState] = useAtom(profileAtom);

  const updateImmutable = (partialConfig: Partial<ThemeType>) => {
    setAuthState({
      ...DefaultStateSettings.profile,
      ...partialConfig,
    });
  };

  return [profile, updateImmutable] as const;
}
