import { ThemeMode } from './theme';

export const APP_STATE_NAME = 'appState';

export interface AuthState {
  token: string;
  isLoggedIn: boolean;
}

export interface ThemeState {
  name: string;
  mode: ThemeMode;
  radius: number;
}

export interface ProfileState {
  username: string;
  email: string;
}

export interface AppState {
  auth: AuthState;
  theme: ThemeState;
  profile: ProfileState;
  signature: string;
  version: string;
}
