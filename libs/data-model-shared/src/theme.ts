export const SYSTEM_PREFERENCE_COLOR_SCHEME = '(prefers-color-scheme: dark)';

export type ThemeMode = 'dark' | 'light' | 'system' | undefined;

export interface ThemeColor {
  light: string;
  dark: string;
}

export interface Theme {
  name: string;
  label: string;
  activeColor: ThemeColor;
}

export interface ThemeSettings {
  theme: Theme['name'];
  radius: number;
}
