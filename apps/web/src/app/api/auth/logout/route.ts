import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ACCESS_TOKEN_KEY } from '@web/cfg/auth';

// POST /api/logout
export async function POST() {
  cookies().set(ACCESS_TOKEN_KEY, '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  return NextResponse.json({ success: true, message: 'Logout successful!' }, { status: 200 });
}
