import { type NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middleware/auth';
import { protectedMiddleware } from './middleware/protected';

/**
 * Middleware function to chain the authentication and error middlewares, etc.
 * @param req request object
 * @returns NextResponse
 */
const middlewares = [protectedMiddleware, authMiddleware];

export default async function middleware(req: NextRequest): Promise<NextResponse> {
  try {
    for (const fn of middlewares) {
      console.log('Middleware:', fn.name);
      const response = await fn(req);
      if (response && response.status !== 200) {
        console.log('Middleware response:', response);
        return response;
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)'],
};
