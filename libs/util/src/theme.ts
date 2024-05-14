import { SYSTEM_COLOR_SCHEME_PREFERENCE, type ThemeMode } from '@repo/dto';

/**
 * A flag indicating whether the code is running on a server or not.
 */
export const isServer: boolean = typeof window === 'undefined';

/**
 * A flag indicating whether the code is running on a browser or not.
 */
export const isBrowser = !isServer;

/**
 * Gets the system theme mode (dark or light) based on the user's preference.
 *
 * @returns The system theme mode, or undefined if running on a server.
 */
export const getSystemThemeMode = (): ThemeMode | undefined => {
  if (isBrowser) {
    const isDark = window.matchMedia(SYSTEM_COLOR_SCHEME_PREFERENCE).matches;
    return isDark ? 'dark' : 'light';
  }
};

/**
 * Gets the current theme mode of the document (dark, light, or system).
 *
 * @returns The current theme mode, or 'light' if running on a server.
 */
export const getDocumentCurrentTheme = (): ThemeMode => {
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
  return 'light';
};

/**
 * Sets the theme mode of the document (dark, light, or system).
 *
 * @param themeMode - The new theme mode to set.
 */
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
