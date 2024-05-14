import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type AppState } from '@repo/dto';
import { sign, verify } from './crypto';
import { getSystemThemeMode } from './theme';

export const DefaultStateSettings: AppState = sign<AppState>({
  auth: { token: '', isLoggedIn: false },
  theme: {
    name: 'zinc',
    mode: 'system',
    radius: 0.5,
  },
  profile: { username: '', email: '' },
  signature: '',
});

interface AppStateStore {
  appState: AppState;
  setAppState: (partialState: Partial<AppState>) => void;
}

const customStorage = createJSONStorage<AppStateStore>(() => localStorage, {
  reviver: (key, value) => {
    let sanitized;

    // sanity check on mutable state from storage
    try {
      sanitized = verify<AppState>(JSON.parse(value as string));
    } catch (e) {
      sanitized = undefined;
    }

    if (!sanitized) {
      // we don't trust the state, verify, and restore to default on error
      const mode = getSystemThemeMode();
      sanitized = sign<AppState>({
        ...DefaultStateSettings,
        theme: { ...DefaultStateSettings.theme, mode },
      });
    }

    return sanitized;
  },
  replacer: (key, value) => {
    return value;
  },
});

export const useAppState = create<AppStateStore>(
  persist<AppStateStore>(
    (set) => ({
      appState: DefaultStateSettings,
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
