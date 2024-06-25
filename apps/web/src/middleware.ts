import { type NextRequest, NextResponse } from 'next/server';
import { logger } from '@lib/data-logger-shared';
import { type JWTPayload, JWTService } from '@lib/data-net-shared';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY, siteSettings } from '@web/cfg';

const { urls } = siteSettings;
const protectedPaths = [urls.site.admin, urls.site.products];
const authPaths = [urls.site.auth.login, urls.site.auth.register, urls.site.auth.logout];

/**
 * Check if the session is still valid and refresh the cookie if needed
 * @param req request object
 * @param authToken access token
 * @returns void
 */
const isSessionValid = async (req: NextRequest): Promise<JWTPayload | undefined> => {
  // get the access token from the cookie
  const cookie = req.cookies.get(ACCESS_TOKEN_KEY);
  if (cookie && cookie.value) {
    // decrypt the access token to check its validity
    const jwtPrev = await JWTService.decrypt(cookie.value);
    if (jwtPrev.success && jwtPrev.data) {
      return jwtPrev.data;
    }
  }
  return undefined;
};

/**
 * Refresh the session cookie if expired
 * @param req request object
 * @param authToken access token
 * @returns void
 */
const refreshCookie = async (req: NextRequest): Promise<boolean> => {
  // check if the session is still valid
  const jwtPayload = await isSessionValid(req);
  if (jwtPayload && jwtPayload.sub) {
    // session is still valid, refresh it

    const jwtNext = await JWTService.encrypt(jwtPayload.sub, ACCESS_TOKEN_EXPIRY);
    if (jwtNext.success && jwtNext.data) {
      const { data: authToken } = jwtNext;
      const response = NextResponse.next();
      response.cookies.set(ACCESS_TOKEN_KEY, authToken, {
        expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      return true;
    }
  }

  return false;
};

/**
 * Error middleware - catch all errors and log them properly, preventing sensitive information from leaking
 * @param req request object
 * @returns request response
 */
export function errorMiddleware(req: NextRequest) {
  try {
    return NextResponse.next();
  } catch (error) {
    logger.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Protected middleware - ensures authentication for protected paths
 * @param req request object
 * @returns request response
 */
export async function protectedMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    const refreshed = await refreshCookie(req);
    if (!refreshed) {
      const loginUrl = new URL(urls.site.auth.login, req.url);
      loginUrl.searchParams.set('nextUrl', req.nextUrl.pathname);
      logger.debug(`Session expired, redirect to login: ${loginUrl.toString()}`);
      return NextResponse.redirect(loginUrl);
    }
  }

  // continue to the next middleware
  return NextResponse.next();
}

/**
 * Authentication middleware - handles the authentication related paths (login, register)
 * @param req request object
 * @returns request response
 */
export async function authMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (authPaths.some((path) => url.pathname.startsWith(path))) {
    const valid = await isSessionValid(req);
    if (valid) {
      // auth paths, but user is already authenticated
      const homeUrl = new URL(urls.site.home, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  // continue to the next middleware
  return NextResponse.next();
}

/**
 * Middleware function to chain the authentication and error middlewares, etc.
 * @param req request object
 * @returns request response
 */
export async function middleware(req: NextRequest) {
  try {
    // check protected paths
    const protectedResponse = await protectedMiddleware(req);
    if (protectedResponse.status !== 200) {
      return protectedResponse;
    }

    // check protected paths
    const authResponse = await authMiddleware(req);
    if (authResponse.status !== 200) {
      return authResponse;
    }

    // check and anonymize errors
    const errorResponse = errorMiddleware(req);
    if (errorResponse.status !== 200) {
      return errorResponse;
    }

    return NextResponse.next();
  } catch (error) {
    logger.error('Unexpected error in middleware:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|favicon.ico).*)',
  ],
};
