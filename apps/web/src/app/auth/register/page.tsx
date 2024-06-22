'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import type { AuthState, RegisterFormInputs, ServerResponseType } from '@lib/data-model-shared';
import { useAuthState } from '@lib/data-store-next';
import { RegisterForm } from '@lib/ui-auth-next';
import { Icon, mdiAccountPlus, mdiLogin } from '@lib/ui-icon-next';
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

const registerUser = async (input: RegisterFormInputs) => {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return response;
};

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [_, setAuthState] = useAuthState();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const cleanupError = () => {
    setError('');
    logger.debug('Register: Error cleared');
  };

  const handleRegister = async (input: RegisterFormInputs) => {
    setError('');
    setIsLoading(true);

    let result: ServerResponseType = { success: false, message: '' };

    // register user
    const response = await registerUser(input);
    if (!response.ok) {
      setError('A server error occurred. Please try again.');
      logger.error('Error during registration');
      setIsLoading(false);
      return;
    }

    result = await response.json();
    setIsLoading(false);

    // handle register result
    if (!result.success || !result.data) {
      setError(result.message || 'Failed to register your account. Please try again.');
      logger.error('Registration unsuccessful:', result.message);
    } else {
      logger.info('Registration successful');

      const { data: accessToken } = result;
      setAuthState({ isLoggedIn: true, accessToken } as AuthState);

      toast({
        title: 'Registration Successful',
        description: 'Enjoy your tour ...',
        timeout: 20000,
        variant: 'info',
      });

      router.push('/');
    }
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
          onSubmit={handleRegister}
          isLoading={isLoading}
          clearError={cleanupError}
          error={error}
        />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        Already have an account?
        <Link href="/auth/login" className="hover:text-foreground/60 flex gap-1 transition-colors">
          <Icon path={mdiLogin} size={1} className="text-primary" />
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
