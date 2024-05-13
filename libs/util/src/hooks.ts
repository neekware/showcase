import { type AuthStateType, type ProfileStateType, type ThemeStateType } from '@repo/dto';
import { useAppState } from './state';

export const useAuthState = () => {
  const auth = useAppState((state) => state.appState.auth);
  const updateAuthState = useAppState((state) => state.setAppState);
  return {
    auth,
    setAuthState: (partialAuth: Partial<AuthStateType>) => {
      updateAuthState({ auth: { ...auth, ...partialAuth } });
    },
  };
};

export const useThemeState = () => {
  const theme = useAppState((state) => state.appState.theme);
  const updateThemeState = useAppState((state) => state.setAppState);
  return {
    theme,
    setThemeState: (partialTheme: Partial<ThemeStateType>) => {
      updateThemeState({ theme: { ...theme, ...partialTheme } });
    },
  };
};

export const useProfileState = () => {
  const profile = useAppState((state) => state.appState.profile);
  const updateProfileState = useAppState((state) => state.setAppState);
  return {
    profile,
    setProfileState: (partialProfile: Partial<ProfileStateType>) => {
      updateProfileState({ profile: { ...profile, ...partialProfile } });
    },
  };
};
