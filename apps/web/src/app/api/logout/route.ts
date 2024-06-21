import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AuthService } from '@lib/data-auth-shared';

// POST /api/logout
export async function POST() {
  const tokenName = 'aTc';
  cookies().delete(tokenName);

  return NextResponse.json({ success: true, message: 'Logout successful!' }, { status: 200 });
}
