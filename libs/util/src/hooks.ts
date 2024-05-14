import { useAtom } from 'jotai';
import { type AppState, type ThemeState } from '@repo/dto';
import { appStateAtom, authAtom, DefaultStateSettings, profileAtom, themeAtom } from './state';

/**
 * Hook to access and update the application state
 *
 * @returns An array containing the current state and an update function
 */
export function useAppState() {
  const [state, setAppState] = useAtom(appStateAtom);

  /**
   * Function to update the application state immutably
   *
   * @param partialConfig - Partial configuration to update the state
   */
  const updateImmutable = (partialConfig: Partial<AppState>) => {
    setAppState({
      ...DefaultStateSettings,
      ...state,
      ...partialConfig,
    });
  };

  return [state, updateImmutable] as const;
}

/**
 * Hook to access and update the theme state
 *
 * @returns An array containing the current theme and an update function
 */
export function useThemeState() {
  const [theme, setThemeState] = useAtom(themeAtom);

  /**
   * Function to update the theme state immutably
   *
   * @param partialConfig - Partial configuration to update the theme
   */
  const updateImmutable = (partialConfig: Partial<ThemeState>) => {
    setThemeState({
      ...DefaultStateSettings.theme,
      ...partialConfig,
    });
  };

  return [theme, updateImmutable] as const;
}

/**
 * Hook to access and update the authentication state
 *
 * @returns An array containing the current auth state and an update function
 */
export function useAuthState() {
  const [auth, setAuthState] = useAtom(authAtom);

  /**
   * Function to update the auth state immutably
   *
   * @param partialConfig - Partial configuration to update the auth state
   */
  const updateImmutable = (partialConfig: Partial<ThemeState>) => {
    setAuthState({
      ...DefaultStateSettings.auth,
      ...partialConfig,
    });
  };

  return [auth, updateImmutable] as const;
}

/**
 * Hook to access and update the profile state
 *
 * @returns An array containing the current profile and an update function
 */
export function useProfileState() {
  const [profile, setAuthState] = useAtom(profileAtom);

  /**
   * Function to update the profile state immutably
   *
   * @param partialConfig - Partial configuration to update the profile
   */
  const updateImmutable = (partialConfig: Partial<ThemeState>) => {
    setAuthState({
      ...DefaultStateSettings.profile,
      ...partialConfig,
    });
  };

  return [profile, updateImmutable] as const;
}
