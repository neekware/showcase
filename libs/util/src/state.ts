import { create } from 'zustand';
import { APP_STATE_NAME, type AppStateType } from '@repo/dto';
import { sanitizeObjectOrString, signObject } from './crypto';
import { getSystemThemeMode } from './theme';

export const DefaultStateSettings: AppStateType = signObject<AppStateType>({
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
  [APP_STATE_NAME]: AppStateType;
  setAppState: (partialState: Partial<AppStateType>) => void;
}

export const useAppState = create<AppStateStore>((set) => ({
  [APP_STATE_NAME]: DefaultStateSettings,
  setAppState: (partialState: Partial<AppStateType>) => {
    set((state) => ({
      ...state,
      [APP_STATE_NAME]: { ...state[APP_STATE_NAME], ...partialState },
    }));
  },
}));

export function appStateStorage(setAppState: (state: AppStateType) => void) {
  const storedState = localStorage.getItem(APP_STATE_NAME);
  let sanitizedState;

  // sanity check on mutable state from storage
  try {
    sanitizedState = sanitizeObjectOrString<AppStateType>(
      storedState ? JSON.parse(storedState) : undefined
    );
  } catch (e) {
    sanitizedState = undefined;
  }

  if (!sanitizedState) {
    // we don't trust the state, verify, and restore to default on error
    const mode = getSystemThemeMode();
    const signedState = signObject<AppStateType>({
      ...DefaultStateSettings,
      theme: { ...DefaultStateSettings.theme, mode },
    });
    setAppState(signedState);
  }
}
