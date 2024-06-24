import { type ThemeMode } from './theme';

export interface AppState {
  // auth
  isLoggedIn: boolean;

  // theme
  name: string;
  mode: ThemeMode;
  radius: number;

  // state store
  signature: string;
  version: string;
}
