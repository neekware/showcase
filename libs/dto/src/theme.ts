import { type Toaster } from 'sonner';

export const SYSTEM_COLOR_SCHEME_PREFERENCE = '(prefers-color-scheme: dark)';
export const DARK_MODE_TYPE = 'class'; // tailwind dark mode type

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

export type ToasterProps = React.ComponentProps<typeof Toaster>;
