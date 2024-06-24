import { type NextRequest, NextResponse } from 'next/server';
import { logger } from '@lib/data-logger-shared';
import { JWTService } from '@lib/data-net-shared';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY, siteSettings } from '@web/cfg';

const protectedPaths = ['/admin', '/products'];
const { urls } = siteSettings;

const redirectOnExpiry = (req: NextRequest) => {
  const loginUrl = new URL(urls.site.auth.login, req.url);
  loginUrl.searchParams.set('nextUrl', req.nextUrl.pathname);
  logger.debug(`Session expired, redirect to login: ${loginUrl.toString()}`);
  return NextResponse.redirect(loginUrl);
};

export function errorMiddleware(req: NextRequest) {
  try {
    return NextResponse.next();
  } catch (error) {
    logger.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function authMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    const cookie = req.cookies.get(ACCESS_TOKEN_KEY);
    if (cookie && cookie.value) {
      // decrypt the access token to check its validity

      const jwtPrev = await JWTService.decrypt(cookie.value);
      if (jwtPrev.success && jwtPrev.data?.sub) {
        const jwtNext = await JWTService.encrypt(jwtPrev.data.sub, 30);
        if (!jwtNext.success || !jwtNext.data) {
          // protected path, but no valid session
          return redirectOnExpiry(req);
        }

        // session is still valid, refresh it
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

    // protected path, but no valid session
    return redirectOnExpiry(req);
  }

  // un-protected path, continue
  return NextResponse.next();
}

export async function middleware(request: NextRequest) {
  // Chain the middleware functions
  const authResponse = await authMiddleware(request);
  if (authResponse.status !== 200) {
    return authResponse;
  }

  // const errorResponse = errorMiddleware(request);
  // if (errorResponse.status !== 200) {
  //   return errorResponse;
  // }

  return NextResponse.next();
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
