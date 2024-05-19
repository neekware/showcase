import NextAuth from 'next-auth';
import { authConfig } from '@web/auth';

export const { auth: middleware } = NextAuth(authConfig);

// import { auth } from "./auth"
// export default auth((req) => {
//   // req.auth
// })

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
