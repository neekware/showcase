'use client';

import { Suspense, useEffect, useState } from 'react';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import { type LoginFormInputs, type ServerResponseType } from '@lib/data-model-shared';
import { type AxiosInstance } from '@lib/data-net-shared';
import { useAppState } from '@lib/data-store-next';
import { LoginForm } from '@lib/ui-auth-next';
import { Icon, mdiFolderPlus, mdiLogin } from '@lib/ui-icon-next';
import { RedirectComponent, useAuthAxios } from '@lib/ui-util-next';
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

const loginUser = async (input: LoginFormInputs, axios: AxiosInstance) => {
  try {
    const response = await axios.post(urls.api.auth.login, input);
    return response;
  } catch (error) {
    logger.error('Error during login:', error);
  }
};

// login page component - client side
function Login() {
  unstable_noStore();
  const authAxios = useAuthAxios(urls.site.base);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nextUrl, setNextUrl] = useState<string>('');
  const [state, setAppState] = useAppState();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  if (state.isLoggedIn) {
    logger.info('Login successful', nextUrl);
    router.replace(`${nextUrl}`);
  }

  // set nextUrl from query params
  useEffect(() => {
    setNextUrl(searchParams.get('nextUrl') || urls.site.home);
  }, [searchParams]);

  // redirect if already logged in
  useEffect(() => {
    if (state.isLoggedIn) {
      toast({
        title: 'Login Successful',
        description: 'Enjoy looking around ...',
        timeout: 4000,
        variant: 'success',
      });
      logger.info('Login successful', nextUrl);
    }
  }, [state, nextUrl, router]);

  // callback that is called from the Form component to clear error
  const cleanupError = () => {
    setError('');
  };

  // callback that is called from the Form component to submit the form
  const onSubmit = async (input: LoginFormInputs) => {
    setError('');
    setIsLoading(true);

    let result: ServerResponseType = { success: false, message: '' };

    // call the login API to authenticate the user
    const response = await loginUser(input, authAxios);
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
      return;
    }

    setAppState({ isLoggedIn: true });
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
          onSubmit={onSubmit}
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
      <RedirectComponent redirect={nextUrl} go={state.isLoggedIn} />
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
