import { type NextRequest, NextResponse } from 'next/server';
import { type JWTPayload, JWTService } from '@lib/data-net-shared';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY } from '@web/cfg';

/**
 * Check if the session is still valid and refresh the cookie if needed
 * @param req request object
 * @returns JWTPayload or undefined
 */
export const isSessionValid = async (req: NextRequest): Promise<JWTPayload | undefined> => {
  const cookie = req.cookies.get(ACCESS_TOKEN_KEY);
  if (cookie && cookie.value) {
    const jwtPrev = await JWTService.decrypt(cookie.value);
    if (jwtPrev.success && jwtPrev.data) {
      return jwtPrev.data;
    }
  }
  return undefined;
};

export const refreshCookie = async (req: NextRequest): Promise<NextResponse | undefined> => {
  const jwtPayload = await isSessionValid(req);
  if (jwtPayload && jwtPayload.sub) {
    const jwtNext = await JWTService.encrypt(jwtPayload.sub, ACCESS_TOKEN_EXPIRY);
    if (jwtNext.success && jwtNext.data) {
      const { data: authToken } = jwtNext;
      const response = NextResponse.next();
      response.cookies.set(ACCESS_TOKEN_KEY, authToken, {
        expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return response;
    }
  }
  return undefined;
};
