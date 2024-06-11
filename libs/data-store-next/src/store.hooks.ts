import {
  type AppState,
  type AuthState,
  type ProfileState,
  type ThemeState,
} from '@lib/data-model-shared';
import { useAtom } from 'jotai';
import {
  appStateAtom,
  authAtom,
  DefaultStateSettings,
  profileAtom,
  themeAtom,
} from './store.state';

/**
 * Hook to access and update the application state
 *
 * @returns An array containing the current state and an update function
 */
// eslint-disable-next-line no-unused-vars
export function useAppState(): readonly [AppState, (partialConfig: Partial<AppState>) => void] {
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
export function useThemeState(): readonly [
  ThemeState,
  // eslint-disable-next-line no-unused-vars
  (partialConfig: Partial<ThemeState>) => void,
] {
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
// eslint-disable-next-line no-unused-vars
export function useAuthState(): readonly [AuthState, (partialConfig: Partial<AuthState>) => void] {
  const [auth, seAuthTableState] = useAtom(authAtom);

  /**
   * Function to update the auth state immutably
   *
   * @param partialConfig - Partial configuration to update the auth state
   */
  const updateImmutable = (partialConfig: Partial<AuthState>) => {
    seAuthTableState({
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
export function useProfileState(): readonly [
  ProfileState,
  // eslint-disable-next-line no-unused-vars
  (partialConfig: Partial<ProfileState>) => void,
] {
  const [profile, seAuthTableState] = useAtom(profileAtom);

  /**
   * Function to update the profile state immutably
   *
   * @param partialConfig - Partial configuration to update the profile
   */
  const updateImmutable = (partialConfig: Partial<ProfileState>) => {
    seAuthTableState({
      ...DefaultStateSettings.profile,
      ...partialConfig,
    });
  };

  return [profile, updateImmutable] as const;
}
