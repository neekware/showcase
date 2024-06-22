import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { JWTService } from '@lib/data-jwt-shared';
import { UserService } from '@lib/data-user-shared';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_KEY } from '@web/cfg/auth';

if (!process.env.NODE_ENV) {
  throw new Error('You must set NODE_ENV in your environment');
}

// POST /api/refresh
export async function POST(req: NextRequest, res: NextResponse) {
  const currentAuthToken = cookies().get(ACCESS_TOKEN_KEY)?.value;
  if (!currentAuthToken) {
    return NextResponse.json({ success: false, message: 'No auth token found' }, { status: 401 });
  }

  const currentJwtAuthPayload = await JWTService.decrypt(currentAuthToken);
  if (!currentJwtAuthPayload.success || !currentJwtAuthPayload.data) {
    return NextResponse.json({ success: false, message: 'Invalid auth token' }, { status: 401 });
  }

  const { sub: userId } = currentJwtAuthPayload.data;
  const result = await UserService.getByIdQuery(userId as string);
  if (!result.success || !result.data) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
  }

  const { data: user } = result;

  if (!user.isActive) {
    return NextResponse.json({ success: false, message: 'User is not active' }, { status: 401 });
  }

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
  return NextResponse.json({ success: true, data: accessToken });
}
