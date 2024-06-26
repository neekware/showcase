import { type NextRequest, NextResponse } from 'next/server';
import { authPaths, mUrls } from './config';
import { isSessionValid } from './util';

/**
 * Authentication middleware - handles the authentication related paths (login, register)
 * @param req request object
 * @returns NextResponse
 */
export async function authMiddleware(req: NextRequest): Promise<NextResponse> {
  const url = req.nextUrl.clone();
  if (authPaths.some((path) => url.pathname.startsWith(path))) {
    const valid = await isSessionValid(req);
    if (valid) {
      const homeUrl = new URL(mUrls.site.home, req.url);
      console.log(`Session is valid, redirect to home: ${homeUrl.toString()}`);
      return NextResponse.redirect(homeUrl);
    }
  }
  return NextResponse.next();
}
