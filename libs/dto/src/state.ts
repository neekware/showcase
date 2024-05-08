import { ThemeMode } from './theme';

export interface AuthType {
  token: string;
  isLoggedIn: boolean;
  ['id']?: unknown;
}

export interface ThemeType {
  name: string;
  mode: ThemeMode;
  radius: number;
  [id: string]: unknown;
}

export interface ProfileType {
  username: string;
  email: string;
  [id: string]: unknown;
}

export interface StateSettings {
  auth: AuthType;
  theme: ThemeType;
  profile: ProfileType;
  [id: string]: unknown;
}
