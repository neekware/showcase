'use client';

import { Provider as StateStoreProvider } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { type AppState } from '@lib/data-model-shared';
import { sign, verify } from '@lib/data-util-shared';

// Defining default state settings
const getDefaultState = () => {
  return sign<AppState>({
    // Initial authentication state
    isLoggedIn: false,

    // Initial theme settings
    name: 'zinc',
    mode: 'system',
    radius: 0.5,

    // Initial signature and version
    signature: 'not-signed-yet',
    version: '1.0.4',
  });
};

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
        const defaultState = getDefaultState();
        let storageValue = value as AppState;
        if (storageValue.version !== defaultState.version) {
          storageValue = defaultState;
        } else {
          const signed = verify<AppState>(value as string);
          if (!signed) {
            storageValue = defaultState;
          }
        }
        return storageValue;
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
const appStateAtom = atomWithStorage<AppState>('appState', getDefaultState(), customStorage);

// Set up the onMount method to listen to custom storage changes
// If the storage is changed from another tab, or the developer tool-kit
// the state will be examined and reset to default if invalid
appStateAtom.onMount = (setAtom) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'appState') {
      const signed = verify<AppState>(event.newValue || '');
      if (!signed) {
        // invalid state, reset to default
        setAtom(getDefaultState());
      }
    }
  };

  window.addEventListener('storage', handleStorageChange);

  // Cleanup function to remove the event listener
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

export { appStateAtom, getDefaultState, StateStoreProvider };
