import { type JWTPayload, JWTService } from '@lib/data-net-shared';

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c?.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c?.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const isSessionValid = async (cookieName: string): Promise<JWTPayload | undefined> => {
  const cookie = getCookie(cookieName);
  if (cookie) {
    console.log('cookie', cookie);
    const jwtPrev = await JWTService.decrypt(cookie);
    if (jwtPrev.success && jwtPrev.data) {
      return jwtPrev.data;
    }
  }
  return undefined;
};
