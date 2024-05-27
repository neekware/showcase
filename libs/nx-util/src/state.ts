// Importing necessary modules
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
  version: '1.0.1',
});

// Creating a custom storage with JSON storage and reviver and replacer functions
const customStorage = createJSONStorage<AppState>(
  () => localStorage, // or sessionStorage, asyncStorage or alike
  {
    // Reviver function to verify the state when retrieved from storage
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
      const signed = verify<AppState>(event.newValue);
      if (!signed) {
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
