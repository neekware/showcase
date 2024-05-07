import { type Toaster } from 'sonner';

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
