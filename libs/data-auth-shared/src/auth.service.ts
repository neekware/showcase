import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  type DataRetrieval,
  type LoginFormInputs,
  type RegisterFormInputs,
} from '@lib/data-model-shared';
import { type User, UserService } from '@lib/data-user-shared';
import { compareSync } from '@lib/data-util-shared';
import { type JWTPayload, jwtVerify, SignJWT } from 'jose';

if (!process.env.AUTH_SECRET) {
  throw new Error('You must set AUTH_SECRET in your environment');
}

export const AuthService = {
  key(secret = process.env.AUTH_SECRET): Uint8Array {
    return new TextEncoder().encode(secret);
  },
  async encrypt(payload: JWTPayload): Promise<string> {
    const key = AuthService.key(process.env.AUTH_SECRET);
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30m')
      .sign(key);
  },
  async decrypt(input: string): Promise<JWTPayload> {
    const key = AuthService.key();
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  },
  async login(data: LoginFormInputs): Promise<DataRetrieval<User>> {
    const result = await UserService.getByEmailQuery(data.email);
    if (!result?.success) return result;

    const { data: user } = result;
    const validPassword = compareSync(data.password, user?.password ?? 'invalid-password-hash');
    if (validPassword) {
      const payload = { email: data.email };
      const expiryInMinutes = 30;
      const expires = new Date(Date.now() + expiryInMinutes * 60 * 1000);
      const session = await AuthService.encrypt({ payload, expires });
      cookies().set('session', session, { expires, httpOnly: true });
      return { success: true, data: user };
    }

    return { success: false, message: `Invalid password, or user doesn't exist` };
  },
  logout(): void {
    cookies().set('session', '', { expires: new Date(0) });
  },
  async register(data: RegisterFormInputs): Promise<DataRetrieval<User>> {
    let result = await UserService.getByEmailQuery(data.email);
    if (!result?.success) return result;

    result = await UserService.createUser(data);
    if (!result?.success) return result;

    const { data: user } = result;
    if (user) {
      const payload = { email: user.email };
      const expiryInMinutes = 30;
      const expires = new Date(Date.now() + expiryInMinutes * 60 * 1000);
      const session = await AuthService.encrypt({ payload, expires });
      cookies().set('session', session, { expires, httpOnly: true });
      return { success: true, data: user };
    }
    return { success: false, message: 'Failed to create a user' };
  },
  async updateSession(request: NextRequest): Promise<NextResponse | void> {
    const session = request.cookies.get('session')?.value;
    if (session) {
      const parsed = await AuthService.decrypt(session);
      const expiryInMinutes = 30;
      parsed.expires = new Date(Date.now() + expiryInMinutes * 60 * 1000);
      const res = NextResponse.next();
      res.cookies.set({
        name: 'session',
        value: await AuthService.encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as Date, // Cast expires to Date
      });
      return res;
    }
  },
};
