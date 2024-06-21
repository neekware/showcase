import { type NextRequest, NextResponse } from 'next/server';
import { JWTService } from '@lib/data-jwt-shared';

const protectedPaths = ['/admin', '/products'];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    // we received a request to a protected path

    // extract the access token from the request headers
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!accessToken) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('nextUrl', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // decrypt the access token to check its validity
    const jwtAccessPayload = await JWTService.decrypt(accessToken);
    if (!jwtAccessPayload.success || !jwtAccessPayload.data) {
      const refreshUrl = new URL('/auth/refresh', req.url);
      const response = await fetch(refreshUrl);
      if (response.status === 401) {
        // auth token is expired, user must login again
        const loginUrl = new URL('/auth/login', req.url);
        loginUrl.searchParams.set('nextUrl', req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
      }
      const { data: newAccessToken } = await response.json();
      req.headers.set('Authorization', `Bearer ${newAccessToken}`);
    }
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
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
