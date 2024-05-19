import { NextResponse } from 'next/server';
import { auth as authHandler } from '@web/auth';

export const GET = authHandler(({ auth }) => {
  return NextResponse.json({ user: auth?.user?.name });
});
