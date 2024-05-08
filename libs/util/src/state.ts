import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  type AuthType,
  type ProfileType,
  type StateSettings,
  type ThemeType,
} from '@repo/dto';

export const DefaultStateSettings: StateSettings = {
  auth: { token: '', isLoggedIn: false },
  theme: { name: 'zinc', mode: 'system', radius: 0.5 },
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
