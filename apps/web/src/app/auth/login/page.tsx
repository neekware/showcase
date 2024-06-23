'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { AxiosInstance } from '@lib/data-jwt-shared';
import { logger } from '@lib/data-logger-shared';
import {
  type AuthState,
  type LoginFormInputs,
  type ServerResponseType,
} from '@lib/data-model-shared';
import { useAxiosAuth } from '@lib/data-net-next';
import { useAuthState } from '@lib/data-store-next';
import { LoginForm } from '@lib/ui-auth-next';
import { Icon, mdiFolderPlus, mdiLogin } from '@lib/ui-icon-next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  toast,
} from '@lib/ui-vendor-next';
import { siteSettings } from '@web/cfg';

const { urls } = siteSettings;

const loginUser = async (input: LoginFormInputs, axiosAuth: AxiosInstance) => {
  try {
    const response = await axiosAuth.post(urls.api.auth.login, input);
    return response;
  } catch (error) {
    logger.error('Error during login:', error);
    return undefined;
  }
};

function Login() {
  const axiosAuth = useAxiosAuth(urls.site.base, urls.api.auth.refresh);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nextUrl, setNextUrl] = useState<string>('');
  const [_, setAuthState] = useAuthState();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNextUrl(searchParams.get('nextUrl') || urls.site.home);
  }, [searchParams]);

  const cleanupError = () => {
    setError('');
    logger.debug('Login: Error cleared');
  };

  const handleLogin = async (input: LoginFormInputs) => {
    setError('');
    setIsLoading(true);

    let result: ServerResponseType = { success: false, message: '' };

    // login user
    const response = await loginUser(input, axiosAuth);
    if (!response) {
      setError('A server error occurred. Please try again.');
      logger.error('Error during login');
      setIsLoading(false);
      return;
    }

    result = response.data;

    setIsLoading(false);

    // handle login result
    if (!result.success || !result.data) {
      setError(result.message || 'Failed to register your account. Please try again.');
      logger.error('Login failed:', result.message);
    } else {
      logger.info('Login successful');

      const { data: accessToken } = result;
      setAuthState({ isLoggedIn: true, accessToken } as AuthState);

      toast({
        title: 'Login Successful',
        description: 'Enjoy your tour ...',
        timeout: 20000,
        variant: 'success',
      });

      logger.info('Logged In, redirecting', nextUrl);
      router.push(nextUrl);
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <Card className="mx-auto w-full sm:w-[500px]">
      <CardHeader className="-mb-2.5 pt-4">
        <div className="flex">
          <div className="flex grow flex-col gap-1.5">
            <CardTitle className="text-xl sm:text-2xl">Account Login</CardTitle>
            <CardDescription>Sign into your account</CardDescription>
          </div>
          <div>
            <Icon path={mdiLogin} size={1.6} className="text-primary" />
          </div>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="pb-3 pt-3">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          clearError={cleanupError}
          error={error}
        />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        Do not have an account?
        <Link
          href={`${urls.site.auth.register}${nextUrl ? `?nextUrl=${encodeURIComponent(nextUrl)}` : ''}`}
          className="hover:text-foreground/60 flex gap-1 transition-colors"
        >
          <Icon path={mdiFolderPlus} size={1} className="text-primary" />
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}

const LoginWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default LoginWithSuspense;
