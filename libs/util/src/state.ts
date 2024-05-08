import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  APP_STATE_NAME,
  type AppState,
  type AuthType,
  type ProfileType,
  type ThemeType,
} from '@repo/dto';

export const DefaultStateSettings: AppState = {
  auth: { token: '', isLoggedIn: false },
  theme: { name: 'zinc', mode: 'system', radius: 0.5 },
  profile: { username: '', email: '' },
};

export const appStateAtom = atomWithStorage<AppState>(
  APP_STATE_NAME,
  DefaultStateSettings
);

export const themeAtom = atom(
  (get) => get(appStateAtom).theme,
  (get, set, update: ThemeType) => {
    const newState = { ...get(appStateAtom), theme: update };
    set(appStateAtom, newState);
  }
);

export const authAtom = atom(
  (get) => get(appStateAtom).auth,
  (get, set, update: AuthType) => {
    const newState = { ...get(appStateAtom), auth: update };
    set(appStateAtom, newState);
  }
);

export const profileAtom = atom(
  (get) => get(appStateAtom).profile,
  (get, set, update: ProfileType) => {
    const newState = { ...get(appStateAtom), profile: update };
    set(appStateAtom, newState);
  }
);
