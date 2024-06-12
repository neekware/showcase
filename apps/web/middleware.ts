import { type NextRequest, NextResponse } from 'next/server';

// import { AuthService } from '@repo/nx-auth';

export async function middleware(request: NextRequest) {
  // await AuthService.updateSession(request);
  if (request.nextUrl.pathname === '/about') {
    return NextResponse.redirect(new URL('/redirected', request.url));
  }
  if (request.nextUrl.pathname === '/another') {
    return NextResponse.rewrite(new URL('/rewrite', request.url));
  }
  return NextResponse.next();
}

// auth protected paths
export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
  skipAuthCheck: ['/icon', '/images', '/related'],
};
