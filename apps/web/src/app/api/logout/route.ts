import { NextResponse } from 'next/server';
import { AuthService } from '@repo/nx-auth';

// POST /api/logout
export async function POST() {
  await AuthService.logout();

  return NextResponse.json({ success: true, message: 'Logout successful!' }, { status: 200 });
}
