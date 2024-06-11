import { type UrlObject } from 'node:url';

export const tokenizeFullName = (fullName: string) => {
  const tokenizedName = {
    firstName: '',
    lastName: '',
  };

  if (fullName.match(/^(.*\s+.*)+$/)) {
    const parts = fullName.replace(/\s\s+/g, ' ').split(' ');
    tokenizedName.firstName = parts[0] || '';
    tokenizedName.lastName = parts.slice(1, parts.length).join(' ');
  }
  return tokenizedName;
};

export const isExpired = (date: Date) => {
  const now = Date.now();
  const expiry = new Date(date).getTime();
  return expiry < now;
};

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
