import { type UrlObject } from 'node:url';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge multiple class names into a single string.
 *
 * @param inputs - The class names to merge.
 * @returns The merged class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A utility function to convert a URL object or string to a string.
 *
 * @param href - The URL object or string to convert.
 * @returns The URL as a string.
 */
export function hrefToString(href: string | UrlObject): string {
  if (typeof href === 'object') {
    return href.href?.toString() ?? '';
  }
  return href;
}
