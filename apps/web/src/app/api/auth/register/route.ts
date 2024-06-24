import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@lib/data-auth-shared';
import { type RegisterFormInputs, RegistrationFormModel } from '@lib/data-model-shared';
import { JWTService } from '@lib/data-net-shared';
import { validateForm } from '@lib/data-util-shared';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY } from '@web/cfg/auth';

// POST /api/register
export async function POST(req: NextRequest) {
  const data = (await req.json()) as RegisterFormInputs;
  const validated = await validateForm<RegisterFormInputs>(RegistrationFormModel, data);
  if (!validated.success) {
    return NextResponse.json(validated);
  }

  const result = await AuthService.register(data);
  if (!result.success || !result.data) {
    return NextResponse.json(result);
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

  return NextResponse.json({ success: true, data: user });
}
