import { ThemeMode } from './theme';

export const APP_STATE_NAME = 'appState';

export interface AuthType {
  token: string;
  isLoggedIn: boolean;
}

export interface ThemeType {
  name: string;
  mode: ThemeMode;
  system: boolean;
  radius: number;
}

export interface ProfileType {
  username: string;
  email: string;
}

export interface AppState {
  auth: AuthType;
  theme: ThemeType;
  profile: ProfileType;
  signature: string;
}
