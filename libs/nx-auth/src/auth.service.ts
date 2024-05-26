import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import * as dotenv from 'dotenv';
import { compareSync } from 'bcryptjs';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { UserDbService } from '@repo/ag-user';
import { LoginInputs } from './schema';

dotenv.config();

// Auth secret must be set in the environment or throw an error
if (!process.env.AUTH_SECRET) {
  throw new Error('You must set AUTH_SECRET in your environment');
}

export const AuthService = {
  key(secret = process.env.AUTH_SECRET) {
    return new TextEncoder().encode(secret);
  },
  async encrypt(payload: JWTPayload) {
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
  async login(data: LoginInputs) {
    const user = await UserDbService.getByEmailQuery(data.email);
    if (!user) {
      throw new Error('User not found');
    }

    if (compareSync(data.password, user.password ?? 'invalid-password-hash')) {
      throw new Error('Invalid password');
    }

    const payload = { email: data.email };
    const expiryInMinutes = 30;
    const expires = new Date(Date.now() + expiryInMinutes * 60 * 1000);
    const session = await AuthService.encrypt({ payload, expires });
    cookies().set('session', session, { expires, httpOnly: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rUser = { ...user, password: '' };
    return rUser;
  },
  async logout() {
    cookies().set('session', '', { expires: new Date(0) });
  },
  async updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) return;
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
  },
};
