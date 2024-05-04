import { type UrlObject } from 'node:url';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function hrefToString(href: string | UrlObject): string {
  if (typeof href === 'object') {
    return href.href?.toString() ?? '';
  }
  return href;
}
