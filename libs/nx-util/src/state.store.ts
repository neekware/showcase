'use client';

import * as semver from 'semver';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { type AppState, type AuthState, type ProfileState, type ThemeState } from '@repo/ag-dto';
import { sign, verify } from '@repo/ag-util';

// Defining default state settings
export const DefaultStateSettings: AppState = sign<AppState>({
  // Initial authentication state
  auth: { token: '', isLoggedIn: false },
  // Initial theme settings
  theme: {
    name: 'zinc',
    mode: 'system',
    radius: 0.5,
  },
  // Initial profile settings
  profile: { username: '', email: '' },
  // Initial signature and version
  signature: 'not-signed-yet',
  version: '1.0.3',
});

const dummyStorage = {
  getItem: () => null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setItem: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeItem: () => {},
};

// Creating a custom storage with JSON storage and reviver and replacer functions
const customStorage = createJSONStorage<AppState>(
  () => (typeof window !== 'undefined' ? localStorage : dummyStorage), // Check if window is defined
  {
    // Reviver function to verify the state when retrieved from storage
    reviver: (key, value) => {
      const rootStateKey = '';

      if (key === rootStateKey) {
        const storageValue = value as AppState;

        if (storageValue.version !== DefaultStateSettings.version) {
          return DefaultStateSettings;
        }

        const signed = verify<AppState>(value as string);
        if (!signed) {
          return DefaultStateSettings;
        }
      }

      return value;
    },
    // Replacer function to sign the state before storing
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

// Creating an atom with storage for the app state
export const appStateAtom = atomWithStorage<AppState>(
  'appState',
  DefaultStateSettings,
  customStorage
);

// Set up the onMount method to listen to custom storage changes
appStateAtom.onMount = (setAtom) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'appState' && event.newValue !== null) {
      let newValue: AppState;
      let oldValue: AppState;

      // parse the new and old values
      try {
        newValue = JSON.parse(event.newValue) as AppState;
        oldValue = JSON.parse(event.oldValue || '{}') as AppState;
      } catch (error) {
        // invalid state, reset to default
        setAtom(DefaultStateSettings);
        return;
      }

      // get the versions
      const newVersion = newValue.version || '';
      const oldVersion = oldValue.version || '';

      // sometimes the old value can be saved in cache by the browser, web workers, etc.
      // we need to verify the best value we've got

      // assume the new value is the one to verify
      let valueToVerify = newValue;

      if (semver.valid(newVersion) && semver.valid(oldVersion)) {
        // if the old version has a higher or equal version, verify the old value instead
        if (semver.lte(newVersion, oldVersion)) {
          valueToVerify = oldValue;
        }
      } else if (!semver.valid(newVersion) && semver.valid(oldVersion)) {
        // if the new version is invalid, verify the old value instead
        valueToVerify = oldValue;
      }

      // verify the best version we've got
      const signed = verify<AppState>(JSON.stringify(valueToVerify));
      if (!signed) {
        // invalid state, reset to default
        setAtom(DefaultStateSettings);
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

// Creating atoms for theme with derived values and update functions
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

// Creating atoms for auth with derived values and update functions
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

// Creating atoms for profile with derived values and update functions
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
