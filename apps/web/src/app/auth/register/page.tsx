'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import type { RegisterFormInputs, ServerResponseType } from '@lib/data-model-shared';
import type { AxiosInstance } from '@lib/data-net-shared';
import { useAppState } from '@lib/data-store-next';
import { RegisterForm } from '@lib/ui-auth-next';
import { Icon, mdiAccountPlus, mdiLogin } from '@lib/ui-icon-next';
import { useAuthAxios } from '@lib/ui-util-next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from '@lib/ui-vendor-next';
import { siteSettings } from '@web/cfg';

const { urls } = siteSettings;

// api call to register a user
const registerUser = async (input: RegisterFormInputs, axios: AxiosInstance) => {
  try {
    const response = await axios.post(urls.api.auth.register, input);
    return response;
  } catch (error) {
    logger.error('Error during registration:', error);
  }
};

// registration page component
function Register() {
  const authAxios = useAuthAxios(urls.site.base);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nextUrl, setNextUrl] = useState<string>('');
  const [state, setAppState] = useAppState();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // set nextUrl from query params
  useEffect(() => {
    setNextUrl(searchParams.get('nextUrl') || urls.site.home);
  }, [searchParams]);

  if (state.isLoggedIn) {
    logger.info('Already logged in', nextUrl);
    router.push(`${nextUrl}`);
  }

  // callback that is called from the Form component to clear error
  const cleanupError = () => {
    setError('');
  };

  // callback that is called from the Form component on submit
  const onSubmit = async (input: RegisterFormInputs) => {
    setError('');
    setIsLoading(true);

    let result: ServerResponseType = { success: false, message: '' };

    // call the login API to authenticate the user
    const response = await registerUser(input, authAxios);
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
      logger.error('Registration failed:', result.message);
      return;
    }

    setAppState({ isLoggedIn: true });
    router.push(nextUrl);
  };

  return (
    <Card className="mx-auto w-full sm:w-[500px]">
      <CardHeader className="-mb-2.5 pt-4">
        <div className="flex">
          <div className="flex grow flex-col gap-1.5">
            <CardTitle className="text-xl sm:text-2xl">Account Registration</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </div>
          <div>
            <Icon path={mdiAccountPlus} size={1.6} className="text-primary" />
          </div>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="pb-3 pt-3">
        <RegisterForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          clearError={cleanupError}
          error={error}
        />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        Already have an account?
        <Link
          href={`${urls.site.auth.login}${nextUrl ? `?nextUrl=${encodeURIComponent(nextUrl)}` : ''}`}
          className="hover:text-foreground/60 flex gap-1 transition-colors"
        >
          <Icon path={mdiLogin} size={1} className="text-primary" />
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}

const RegisterWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Register />
    </Suspense>
  );
};

export default RegisterWithSuspense;
