import { type UrlObject } from 'node:url';

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
