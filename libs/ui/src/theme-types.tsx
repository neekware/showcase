export type ThemeMode = 'dark' | 'light' | 'system';
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
