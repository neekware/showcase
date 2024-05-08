import { type UrlObject } from 'node:url';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type ThemeMode } from '@repo/dto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hrefToString(href: string | UrlObject): string {
  if (typeof href === 'object') {
    return href.href?.toString() ?? '';
  }
  return href;
}

export function isSystemTheme(): ThemeMode {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'light'; // or return 'dark' as ThemeMode, depending on your desired default behavior
}
