import { SYSTEM_COLOR_SCHEME_PREFERENCE, type ThemeMode } from '@repo/dto';

export const isServer: boolean = typeof window === 'undefined';
export const isBrowser = !isServer;

export const getSystemThemeMode = (): ThemeMode => {
  if (isBrowser) {
    const isDark = window.matchMedia(SYSTEM_COLOR_SCHEME_PREFERENCE).matches;
    return isDark ? 'dark' : 'light';
  }
};

export const getDocumentCurrentTheme = () => {
  if (isBrowser) {
    const el = document.documentElement;
    if (el.classList.contains('dark')) {
      return 'dark';
    } else if (el.classList.contains('light')) {
      return 'light';
    } else if (el.classList.contains('system')) {
      return 'system';
    }
    return 'light';
  }
};

export function setDocumentThemeMode(themeMode: ThemeMode): void {
  if (isBrowser) {
    const el = document.documentElement;
    const currentThemeMode = getSystemThemeMode();
    if (currentThemeMode !== themeMode) {
      el.style.transition = 'none'; // Disable transitions
      el.classList.remove('dark', 'light', 'system'); // Remove all potential classes
      el.classList.add(themeMode as string); // Add the new theme class
      el.style.colorScheme = themeMode as string; // Set color scheme for CSS media queries
      el.offsetHeight; // Force reflow

      // Defer re-enabling transitions until after other synchronous style changes have taken effect.
      setTimeout(() => {
        el.style.transition = ''; // Re-enable transitions
      });
    }
  }
}
