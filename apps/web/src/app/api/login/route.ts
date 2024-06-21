import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@lib/data-auth-shared';
import { JWTService } from '@lib/data-jwt-shared';
import { type LoginFormInputs, LoginFormModel } from '@lib/data-model-shared';
import { validateForm } from '@lib/data-util-shared';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY } from '@web/cfg/auth';

if (!process.env.NODE_ENV) {
  throw new Error('You must set NODE_ENV in your environment');
}

// POST /api/login
export async function POST(req: NextRequest, res: NextResponse) {
  const data = (await req.json()) as LoginFormInputs;

  // Validate the form data
  const validated = await validateForm<LoginFormInputs>(LoginFormModel, data);
  if (!validated.success) {
    return NextResponse.json(validated, { status: 400 });
  }

  // Attempt to login the user
  const result = await AuthService.login(data);
  if (!result.success || !result.data) {
    return NextResponse.json(result, { status: 404 });
  }

  const { data: user } = result;

  // Create an access auth token and save it in a httpOnly cookie
  const jwtAuthPayload = await JWTService.encrypt(user.id, 30);
  if (!jwtAuthPayload.success || !jwtAuthPayload.data) {
    return NextResponse.json(
      { success: false, message: 'Error creating auth token' },
      { status: 500 }
    );
  }
  const { data: authToken } = jwtAuthPayload;
  cookies().set(ACCESS_TOKEN_KEY, authToken, {
    expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  // Create a access token and return it to user, to be used in headers on all requests
  const jwtAccessPayload = await JWTService.encrypt(user.id, 5);
  if (!jwtAccessPayload.success || !jwtAccessPayload.data) {
    return NextResponse.json(
      { success: false, message: 'Error creating access token' },
      { status: 500 }
    );
  }
  const { data: accessToken } = jwtAuthPayload;

  // Set the redirect URL in the response headers
  const nextUrl = req.nextUrl.searchParams.get('nextUrl') || '/';
  return NextResponse.json({ success: true, data: { accessToken, nextUrl } }, { status: 200 });
}
