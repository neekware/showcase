import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import {
  APP_STATE_NAME,
  type AppState,
  type AuthState,
  type ProfileState,
  type ThemeState,
} from '@repo/dto';
import { sign, verify } from './crypto';
import { isBrowser } from './theme';

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

export const appStateAtom = atomWithStorage<AppState>(APP_STATE_NAME, DefaultStateSettings);

export const themeAtom = atom(
  (get) => get(appStateAtom).theme,
  (get, set, update: ThemeState) => {
    const newState = sign<AppState>({
      ...DefaultStateSettings,
      ...get(appStateAtom),
      theme: update,
    });
    set(appStateAtom, newState);
  }
);

export const authAtom = atom(
  (get) => get(appStateAtom).auth,
  (get, set, update: AuthState) => {
    const newState = sign<AppState>({
      ...DefaultStateSettings,
      ...get(appStateAtom),
      auth: update,
    });
    set(appStateAtom, newState);
  }
);

export const profileAtom = atom(
  (get) => get(appStateAtom).profile,
  (get, set, update: ProfileState) => {
    const newState = sign<AppState>({
      ...DefaultStateSettings,
      ...get(appStateAtom),
      profile: update,
    });
    set(appStateAtom, newState);
  }
);

// export function stateStorageInit(setAppState: (state: AppState) => void) {
//   const storedState = localStorage.getItem(APP_STATE_NAME);
//   let sanitizedState;

//   // sanity check on mutable state from storage
//   try {
//     sanitizedState = sanitizeObjectOrString<AppState>(
//       storedState ? JSON.parse(storedState) : undefined
//     );
//   } catch (e) {
//     sanitizedState = undefined;
//   }

//   if (!sanitizedState) {
//     // we don't trust the state, verify, and restore to default on error
//     const mode = getSystemThemeMode();
//     const signedState = signObject<AppState>({
//       ...DefaultStateSettings,
//       theme: { ...DefaultStateSettings.theme, mode },
//     });
//     setAppState(signedState);
//   }
// }

// const customStorage = createJSONStorage<AppState>(() => localStorage, {
//   reviver: (key, value) => {
//     if (key !== appStateName) {
//       return value;
//     }

//     let sanitized = verify<AppState>(value as string);

//     if (!sanitized) {
//       sanitized = DefaultStateSettings;
//     }

//     return sanitized;
//   },
//   replacer: (key, value) => {
//     if (key !== appStateName) {
//       return value;
//     }

//     let sanitized = verify<AppState>(value as string);

//     if (!sanitized) {
//       sanitized = DefaultStateSettings;
//     }

//     return sanitized;
//   },
// });

// export const useAppStateStore = create<AppStateStore>(
//   persist<AppStateStore>(
//     (set) => ({
//       appState: DefaultStateSettings,
//       setAppState: (partialState: Partial<AppState>) => {
//         set((state) => ({
//           appState: sign({ ...state.appState, ...partialState }),
//         }));
//       },
//     }),
//     {
//       name: appStateName,
//       storage: customStorage,
//     }
//   ) as StateCreator<AppStateStore>
// );

// export const withStorageDOMEvents = (store: StoreWithPersist) => {
//   const storageEventCallback = (e: StorageEvent) => {
//     if (e.key === store.persist.getOptions().name && e.newValue) {
//       let sanitized = verify<AppState>(e.newValue);

//       if (!sanitized) {
//         sanitized = DefaultStateSettings;
//       }
//       store.setState({ appState: { ...sanitized } });
//     }
//   };

//   if (typeof isBrowser !== 'undefined' && isBrowser) {
//     window.addEventListener('storage', storageEventCallback);
//   }

//   return () => {
//     if (typeof isBrowser !== 'undefined' && isBrowser) {
//       window.removeEventListener('storage', storageEventCallback);
//     }
//   };
// };

// // Ensure useAppStateStore matches the expected type for StoreWithPersist
// withStorageDOMEvents({
//   persist: {
//     getOptions: () => ({ name: appStateName }),
//   },
//   setState: (state: AppStateStore) => {
//     useAppStateStore.setState({
//       appState: { ...state.appState },
//     });
//   },
// } as StoreWithPersist);
