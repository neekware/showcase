import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import {
  APP_STATE_NAME,
  type AppState,
  type AuthState,
  type ProfileState,
  type ThemeState,
} from '@repo/dto';
import { sign, verify } from './crypto';

export const DefaultStateSettings: AppState = sign<AppState>({
  auth: { token: '', isLoggedIn: false },
  theme: {
    name: 'zinc',
    mode: 'system',
    radius: 0.5,
  },
  profile: { username: '', email: '' },
  signature: '',
  version: '1.0.0',
});

const customStorage = createJSONStorage<AppState>(
  () => localStorage, // or sessionStorage, asyncStorage or alike
  {
    // triggers on storage events to verify the state: storage state -> app state
    // shared storage between tabs and devtools and works with SSR and initial state
    reviver: (key, value) => {
      const rootStateKey = '';
      if (key === rootStateKey) {
        const signed = verify<AppState>(value as string);
        if (!signed) {
          return DefaultStateSettings;
        }
      }
      return value;
    },
    // triggers on app events to sign the state before storage: app state -> storage state
    replacer: (key, value) => {
      const rootStateKey = '';
      if (key === rootStateKey) {
        const signed = sign<AppState>(value as AppState);
        return signed;
      }
      return value;
    },
  }
);

export const appStateAtom = atomWithStorage<AppState>(
  APP_STATE_NAME,
  DefaultStateSettings,
  customStorage
);

export const themeAtom = atom(
  (get) => get(appStateAtom).theme,
  (get, set, update: ThemeState) => {
    set(appStateAtom, {
      ...DefaultStateSettings,
      ...get(appStateAtom),
      theme: update,
    });
  }
);

export const authAtom = atom(
  (get) => get(appStateAtom).auth,
  (get, set, update: AuthState) => {
    set(appStateAtom, {
      ...DefaultStateSettings,
      ...get(appStateAtom),
      auth: update,
    });
  }
);

export const profileAtom = atom(
  (get) => get(appStateAtom).profile,
  (get, set, update: ProfileState) => {
    set(appStateAtom, {
      ...DefaultStateSettings,
      ...get(appStateAtom),
      profile: update,
    });
  }
);
