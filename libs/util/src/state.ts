import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface AuthType {
  token: string;
  isLoggedIn: boolean;
  ['id']?: unknown;
}

export interface ThemeType {
  colorScheme: string;
  radius: number;
  [id: string]: unknown;
}

export interface ProfileType {
  username: string;
  email: string;
  [id: string]: unknown;
}

export interface StateSettings {
  auth: AuthType;
  theme: ThemeType;
  profile: ProfileType;
  [id: string]: unknown;
}

export const DefaultStateSettings: StateSettings = {
  auth: { token: '', isLoggedIn: false },
  theme: { colorScheme: 'zinc', radius: 0.5 },
  profile: { username: '', email: '' },
};

const globalStateAtom = atomWithStorage<StateSettings>(
  'globalStateAtom',
  DefaultStateSettings
);

export const themeAtom = atom(
  (get) => get(globalStateAtom).theme,
  (get, set, update: ThemeType) => {
    const newState = { ...get(globalStateAtom), theme: update };
    set(globalStateAtom, newState);
  }
);

export const authAtom = atom(
  (get) => get(globalStateAtom).auth,
  (get, set, update: AuthType) => {
    const newState = { ...get(globalStateAtom), auth: update };
    set(globalStateAtom, newState);
  }
);

export const profileAtom = atom(
  (get) => get(globalStateAtom).profile,
  (get, set, update: ProfileType) => {
    const newState = { ...get(globalStateAtom), profile: update };
    set(globalStateAtom, newState);
  }
);
