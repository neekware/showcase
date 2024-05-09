import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  APP_STATE_NAME,
  type AppState,
  type AuthType,
  type ProfileType,
  type ThemeType,
} from '@repo/dto';
import { signObject } from './crypto';

export const DefaultStateSettings: AppState = signObject<AppState>({
  auth: { token: '', isLoggedIn: false },
  theme: { name: 'zinc', mode: 'system', radius: 0.5 },
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
      ...get(appStateAtom),
      profile: update,
    });
    set(appStateAtom, newState);
  }
);
