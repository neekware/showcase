import { ThemeMode } from './theme';

export const APP_STATE_NAME = 'appState';

export interface AuthStateType {
  token: string;
  isLoggedIn: boolean;
}

export interface ThemeStateType {
  name: string;
  mode: ThemeMode;
  radius: number;
}

export interface ProfileStateType {
  username: string;
  email: string;
}

export interface AppStateType {
  auth: AuthStateType;
  theme: ThemeStateType;
  profile: ProfileStateType;
  signature: string;
}
