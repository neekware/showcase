import { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from './auth.credentials';
import { AUTH_BASE_API_PATH, AUTH_BASE_PATH, AUTH_SECRET } from './auth.default';

export const authConfig = {
  providers: [Credentials, GitHub],
  basePath: AUTH_BASE_API_PATH,
  secret: AUTH_SECRET,
  pages: {
    signIn: `${AUTH_BASE_PATH}/login`,
    signOut: `${AUTH_BASE_PATH}/logout`,
    error: `${AUTH_BASE_PATH}/error`,
  },
} satisfies NextAuthConfig;
