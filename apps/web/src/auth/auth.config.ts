import NextAuth, { type NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from './auth.credentials';

export const authConfig = {
  providers: [Credentials, GitHub],
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
