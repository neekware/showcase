import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';

export const AuthService = {
  key(secret: string) {
    return new TextEncoder().encode(secret);
  },
  async encrypt(secret: string, payload: JWTPayload) {
    const key = AuthService.key(secret);
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30m')
      .sign(key);
  },
  async decrypt(secret: string, input: string): Promise<JWTPayload> {
    const key = AuthService.key(secret);
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  },
  async login(secret: string, formData: FormData) {
    const user = { email: formData.get('email'), name: 'John' };
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await AuthService.encrypt(secret, { user, expires });
    cookies().set('session', session, { expires, httpOnly: true });
  },
  async logout() {
    cookies().set('session', '', { expires: new Date(0) });
  },
  async updateSession(secret: string, request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) return;
    const parsed = await AuthService.decrypt(secret, session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: 'session',
      value: await AuthService.encrypt(secret, parsed),
      httpOnly: true,
      expires: parsed.expires as Date, // Cast expires to Date
    });
    return res;
  },
};
