'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { mdiFolderPlus, mdiLogin } from '@mdi/js';
import { Icon } from '@mdi/react';
import { LoginForm } from '@repo/nx-ui-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  useToast,
} from '@repo/nx-ui-vendor';
import { useAuthState } from '@repo/nx-util';

export default function Login() {
  const [auth] = useAuthState();
  const prevIsLoggedIn = useMemo(() => auth.isLoggedIn, []);
  const { toast } = useToast();

  useEffect(() => {
    // we are already logged in, login page is not available
    // they have bookmarked the login page or manually navigated to it
    // redirect right away without showing the login form
    if (prevIsLoggedIn) {
      redirect('/');
    } else if (auth.isLoggedIn) {
      toast({
        title: 'Login Successful',
        description: 'Redirecting to home page...',
        timeout: 3000,
      });
      redirect('/');
    }
  }, [auth]);

  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader className="-mb-2.5 pt-4">
        <div className="flex">
          <div className="flex grow flex-col gap-1.5">
            <CardTitle>Account Login</CardTitle>
            <CardDescription>Sign into your account</CardDescription>
          </div>
          <div>
            <Icon path={mdiLogin} size={1.6} className="text-primary" />
          </div>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="pb-3 pt-3">
        <LoginForm />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        Do not have an account?
        <Link
          href="/auth/register"
          className="hover:text-foreground/60 flex gap-1 transition-colors"
        >
          <Icon path={mdiFolderPlus} size={1} />
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
