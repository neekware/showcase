import { create, type Mutate, type StateCreator, type StoreApi } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type AppState } from '@repo/dto';
import { sign, verify } from './crypto';
import { getSystemThemeMode, isBrowser } from './theme';

type StoreWithPersist = Mutate<StoreApi<AppStateStore>, [['zustand/persist', unknown]]>;

interface AppStateStore {
  appState: AppState;
  setAppState: (partialState: Partial<AppState>) => void;
}

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

const setDefault = (): AppState => {
  const mode = getSystemThemeMode();
  const sanitized = sign<AppState>({
    ...DefaultStateSettings,
    theme: { ...DefaultStateSettings.theme, mode },
  });
  return sanitized;
};

const customStorage = createJSONStorage<AppStateStore>(() => localStorage, {
  reviver: (key, value) => {
    let sanitized = verify<AppState>(value as string);

    if (!sanitized) {
      sanitized = setDefault();
    }

    return sanitized;
  },
  replacer: (key, value) => value,
});

export const useAppStateStore = create<AppStateStore>(
  persist<AppStateStore>(
    (set) => ({
      appState: setDefault(),
      setAppState: (partialState: Partial<AppState>) => {
        set((state) => ({
          appState: { ...state.appState, ...partialState },
        }));
      },
    }),
    {
      name: 'appState',
      storage: customStorage,
    }
  ) as StateCreator<AppStateStore>
);

export const withStorageDOMEvents = (store: StoreWithPersist) => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      let sanitized = verify<AppState>(e.newValue);

      if (!sanitized) {
        sanitized = setDefault();
      }
      store.setState({ appState: { ...sanitized } });
    }
  };

  if (typeof isBrowser !== 'undefined' && isBrowser) {
    window.addEventListener('storage', storageEventCallback);
  }

  return () => {
    if (typeof isBrowser !== 'undefined' && isBrowser) {
      window.removeEventListener('storage', storageEventCallback);
    }
  };
};

// Ensure useAppStateStore matches the expected type for StoreWithPersist
withStorageDOMEvents({
  persist: {
    getOptions: () => ({ name: 'appState' }),
  },
  setState: (state: AppStateStore) => {
    useAppStateStore.setState({
      appState: { ...state.appState },
    });
  },
} as StoreWithPersist);
