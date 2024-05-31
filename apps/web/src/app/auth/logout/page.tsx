'use client';

import { type FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mdiLogout } from '@mdi/js';
import { Icon } from '@mdi/react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from '@repo/nx-ui-vendor';
import { useAuthState } from '@repo/nx-util';

export default function Logout() {
  const router = useRouter();
  const [auth, setAuthState] = useAuthState();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    // fire and forget, let's log the user out and redirect
    setAuthState({ isLoggedIn: false, token: '' });
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push('/');
    }
  }, [auth]);

  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader className="-mb-2.5 pt-4">
        <div className="flex">
          <div className="flex grow flex-col gap-1.5">
            <CardTitle>Account Logout</CardTitle>
            <CardDescription>Logout out of your account</CardDescription>
          </div>
          <div>
            <Icon path={mdiLogout} size={1.6} className="text-primary" />
          </div>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="pt-4">
        <form noValidate className="space-y-4" onSubmit={handleSubmit}>
          <div>Are you sure you want to logout?</div>
          <Button className="w-full" type="submit">
            Logout
          </Button>
        </form>
      </CardContent>
      <Separator orientation="horizontal" />
    </Card>
  );
}
