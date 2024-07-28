import { type JWTPayload, JWTService } from '@lib/data-net-shared';

/**
 * Get the value of a cookie
 * @param name name of the cookie
 * @returns value of the cookie
 */
export const getCookie = (name: string): string | undefined => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c?.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c?.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
};

/**
 * Check if a cookie exists and is valid
 * @param name name of the cookie
 * @param value value of the cookie
 * @param days days to expire
 */
export const isSessionValid = async (cookieName: string): Promise<JWTPayload | undefined> => {
  const cookie = getCookie(cookieName);
  if (cookie) {
    const jwtPrev = await JWTService.decrypt(cookie);
    if (jwtPrev.success && jwtPrev.data) {
      return jwtPrev.data;
    }
  }
  return undefined;
};
