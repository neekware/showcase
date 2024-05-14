import { type AuthState, type ProfileState, type ThemeState } from '@repo/dto';
import { useAppStateStore } from './state';

export const useAuthState = () => {
  const auth = useAppStateStore((state) => state.appState.auth);
  const updateAuthState = useAppStateStore((state) => state.setAppState);
  return {
    auth,
    setAuthState: (partialAuth: Partial<AuthState>) => {
      updateAuthState({ auth: { ...auth, ...partialAuth } });
    },
  };
};

export const useThemeState = () => {
  const theme = useAppStateStore((state) => state.appState.theme);
  const updateThemeState = useAppStateStore((state) => state.setAppState);
  return {
    theme,
    setThemeState: (partialTheme: Partial<ThemeState>) => {
      updateThemeState({ theme: { ...theme, ...partialTheme } });
    },
  };
};

export const useProfileState = () => {
  const profile = useAppStateStore((state) => state.appState.profile);
  const updateProfileState = useAppStateStore((state) => state.setAppState);
  return {
    profile,
    setProfileState: (partialProfile: Partial<ProfileState>) => {
      updateProfileState({ profile: { ...profile, ...partialProfile } });
    },
  };
};
