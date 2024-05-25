import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { sysEnv } from '@repo/ag-env';
import { LoginInputs } from './schema';

export const AuthService = {
  key(secret = sysEnv.AUTH_SECRET) {
    return new TextEncoder().encode(secret);
  },
  async encrypt(payload: JWTPayload) {
    const key = AuthService.key(sysEnv.AUTH_SECRET);
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
    const user = { email: data.email };
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await AuthService.encrypt({ user, expires });
    cookies().set('session', session, { expires, httpOnly: true });
  },
  async logout() {
    cookies().set('session', '', { expires: new Date(0) });
  },
  async updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) return;
    const parsed = await AuthService.decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
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
