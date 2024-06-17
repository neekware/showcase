'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAppState } from '@lib/data-store-next';
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
} from '@lib/ui-vendor-next';

export default function Register() {
  const [state] = useAppState();

  useEffect(() => {
    // redirect to home page if user is already logged in
    if (state.auth.isLoggedIn) {
      redirect('/');
    }
  }, []);

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
        <RegisterForm />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        Already have an account?
        <Link href="/auth/login" className="hover:text-foreground/60 flex gap-1 transition-colors">
          <Icon path={mdiLogin} size={1} />
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
