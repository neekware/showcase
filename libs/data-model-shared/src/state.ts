import { type ThemeMode } from './theme';

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
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
