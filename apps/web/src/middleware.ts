import { type NextRequest, NextResponse } from 'next/server';
import { type JWTPayload, JWTService } from '@lib/data-net-shared';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY, siteSettings, urls } from '@web/cfg';

export const { urls: mUrls } = siteSettings;
export const mProtectedPaths = [];
export const mAuthPaths = [urls.site.auth.login, urls.site.auth.register, urls.site.auth.logout];

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)'],
};

/**
 * Middleware function to chain the authentication and error middlewares, etc.
 * @param req request object
 * @returns NextResponse
 */

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  // prevent sensitive data from being returned on exceptions
  try {
    const jwtPayload = await isSessionValid(req);
    const alreadyLoggedIn = jwtPayload && jwtPayload.sub;

    // Check auth related paths (login, register)
    //////////////////////////////////////////////////////////////////////
    if (mAuthPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      if (alreadyLoggedIn) {
        const absoluteHomeURL = new URL(mUrls.site.home, req.nextUrl.origin);
        console.log(`Session is valid, redirect to home: ${absoluteHomeURL.toString()}`);
        return NextResponse.redirect(absoluteHomeURL);
      }
      return NextResponse.next();
    }

    // Check if the request is to access protected paths
    //////////////////////////////////////////////////////////////////////
    if (mProtectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      if (alreadyLoggedIn) {
        return refreshCookie(jwtPayload, NextResponse.next());
      }

      const absoluteLoginURL = new URL(mUrls.site.auth.login, req.nextUrl.origin);
      absoluteLoginURL.searchParams.set('nextUrl', req.nextUrl.pathname);
      console.log(`Session expired, redirect to login: ${absoluteLoginURL.toString()}`);
      return NextResponse.redirect(absoluteLoginURL);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }

  return NextResponse.next();
}

/**
 * Check if the session is still valid and refresh the cookie if needed
 * @param req request object
 * @returns JWTPayload or undefined
 */
const isSessionValid = async (req: NextRequest): Promise<JWTPayload | undefined> => {
  const cookie = req.cookies.get(ACCESS_TOKEN_KEY);
  if (cookie && cookie.value) {
    const jwtPrev = await JWTService.decrypt(cookie.value);
    if (jwtPrev.success && jwtPrev.data) {
      return jwtPrev.data;
    }
  }
  return undefined;
};

/**
 * Refresh the cookie if the session is still valid
 * @param req request object
 * @returns NextResponse or undefined
 */
const refreshCookie = async (jwtPayload: JWTPayload, response: NextResponse) => {
  if (jwtPayload && jwtPayload.sub) {
    const jwtNext = await JWTService.encrypt(jwtPayload.sub, ACCESS_TOKEN_EXPIRY);
    if (jwtNext.success && jwtNext.data) {
      const { data: authToken } = jwtNext;
      response.cookies.set(ACCESS_TOKEN_KEY, authToken, {
        expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return response;
    }
  }
  return response;
};
