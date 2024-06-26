import { type NextRequest, NextResponse } from 'next/server';
import { mProtectedPaths, mUrls } from './config';
import { refreshCookie } from './util';

/**
 * Protected middleware - ensures authentication for protected paths
 * @param req request object
 * @returns NextResponse
 */
export async function protectedMiddleware(req: NextRequest): Promise<NextResponse> {
  const url = req.nextUrl.clone();
  if (mProtectedPaths.some((path) => url.pathname.startsWith(path))) {
    const response = await refreshCookie(req);
    if (!response) {
      const loginUrl = new URL(mUrls.site.auth.login, req.url);
      loginUrl.searchParams.set('nextUrl', req.nextUrl.pathname);
      console.log(`Session expired, redirect to login: ${loginUrl.toString()}`);
      return NextResponse.redirect(loginUrl);
    }
    console.log(`Session refreshed, continue to: ${url.toString()}`);
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
  return NextResponse.next();
}
