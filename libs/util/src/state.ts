import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  APP_STATE_NAME,
  type AppState,
  type AuthType,
  type ProfileType,
  type ThemeType,
} from '@repo/dto';
import { sanitizeObjectOrString, signObject } from './crypto';
import { getSystemThemeMode } from './theme';

export const DefaultStateSettings: AppState = signObject<AppState>({
  auth: { token: '', isLoggedIn: false },
  theme: {
    name: 'zinc',
    mode: 'light',
    system: true,
    radius: 0.5,
  },
  profile: { username: '', email: '' },
  signature: '',
});

export const appStateAtom = atomWithStorage<AppState>(
  APP_STATE_NAME,
  DefaultStateSettings
);

export const themeAtom = atom(
  (get) => get(appStateAtom).theme,
  (get, set, update: ThemeType) => {
    const newState = signObject<AppState>({
      ...DefaultStateSettings,
      ...get(appStateAtom),
      theme: update,
    });
    set(appStateAtom, newState);
  }
);

export const authAtom = atom(
  (get) => get(appStateAtom).auth,
  (get, set, update: AuthType) => {
    const newState = signObject<AppState>({
      ...DefaultStateSettings,
      ...get(appStateAtom),
      auth: update,
    });
    set(appStateAtom, newState);
  }
);

export const profileAtom = atom(
  (get) => get(appStateAtom).profile,
  (get, set, update: ProfileType) => {
    const newState = signObject<AppState>({
      ...DefaultStateSettings,
      ...get(appStateAtom),
      profile: update,
    });
    set(appStateAtom, newState);
  }
);

export function stateStorageInit(setAppState: (state: AppState) => void) {
  const storedState = localStorage.getItem(APP_STATE_NAME);
  let sanitizedState;

  // sanity check on mutable state from storage
  try {
    sanitizedState = sanitizeObjectOrString<AppState>(
      storedState ? JSON.parse(storedState) : undefined
    );
  } catch (e) {
    sanitizedState = undefined;
  }

  if (!sanitizedState) {
    // we don't trust the state, verify, and restore to default on error
    const mode = getSystemThemeMode();
    const signedState = signObject<AppState>({
      ...DefaultStateSettings,
      theme: { ...DefaultStateSettings.theme, mode },
    });
    setAppState(signedState);
  }
}
