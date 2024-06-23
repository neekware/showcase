import { type NextRequest, NextResponse } from 'next/server';
import { JWTService } from '@lib/data-jwt-shared';
import { logger } from '@lib/data-logger-shared';
import { siteSettings } from '@web/cfg';

const protectedPaths = ['/admin', '/products'];
const { urls } = siteSettings;

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
    console.log('Protected path:', req.headers);
    // extract the access token from the request headers
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (accessToken) {
      // decrypt the access token to check its validity
      const jwtAccessPayload = await JWTService.decrypt(accessToken);
      if (jwtAccessPayload.success) {
        return NextResponse.next();
      }
    }

    // redirect to login page if token is invalid
    const loginUrl = new URL(urls.site.auth.login, req.url);
    loginUrl.searchParams.set('nextUrl', req.nextUrl.pathname);
    logger.debug(
      `Middleware: Invalid access token, redirecting to login page: ${loginUrl.toString()}`
    );
    return NextResponse.redirect(loginUrl);
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

  const errorResponse = errorMiddleware(request);
  if (errorResponse.status !== 200) {
    return errorResponse;
  }

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
