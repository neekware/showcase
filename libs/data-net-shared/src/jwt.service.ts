import { type JWTPayload, jwtVerify, SignJWT } from 'jose';
import { logger } from '@lib/data-logger-shared';
import { type DataRetrieval } from '@lib/data-model-shared';

if (!process.env.AUTH_SECRET) {
  throw new Error('You must set AUTH_SECRET in your environment');
}

if (!process.env.AUTH_ISSUER) {
  throw new Error('You must set AUTH_ISSUER in your environment');
}

export const JWTService = {
  issuer() {
    return process.env.AUTH_ISSUER || 'example.com';
  },
  key(secret = process.env.AUTH_SECRET): Uint8Array {
    return new TextEncoder().encode(secret);
  },
  async encrypt(userId: string, expires: number): Promise<DataRetrieval<string>> {
    const key = JWTService.key(process.env.AUTH_SECRET);
    try {
      return {
        success: true,
        data: await new SignJWT({
          sub: userId,
          exp: expires,
          iat: Date.now(),
          iss: JWTService.issuer(),
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime(expires)
          .sign(key),
      };
    } catch (e) {
      logger.error(e);
      return { success: false, message: 'Failed to create token' };
    }
  },
  async decrypt(token: string): Promise<DataRetrieval<JWTPayload>> {
    const key = JWTService.key();
    try {
      const { payload } = await jwtVerify(token, key, {
        algorithms: ['HS256'],
      });
      return { success: true, data: payload };
    } catch (e) {
      logger.error(e);
      return { success: false, message: 'Failed to verify token' };
    }
  },
};
