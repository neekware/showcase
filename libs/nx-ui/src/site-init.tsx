'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useToast } from '@repo/nx-ui-vendor';
import { useAppState } from '@repo/nx-util';

export function AppInit(): null {
  const router = useRouter();
  const [state] = useAppState();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [prevIsLoggedIn, setPrevIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      if (state.auth.isLoggedIn) {
        router.push('/');
      }
      setPrevIsLoggedIn(state.auth.isLoggedIn);
    } else {
      if (!prevIsLoggedIn && state.auth.isLoggedIn) {
        router.push('/');
        toast({
          title: 'Login Successful',
          description: 'You are logged in as ...',
          timeout: 3000,
        });
      } else if (prevIsLoggedIn && !state.auth.isLoggedIn) {
        router.push('/');
        toast({
          title: 'Logout Successful',
          description: 'You are now logged out',
          timeout: 3000,
        });
      }
      setPrevIsLoggedIn(state.auth.isLoggedIn);
    }
  }, [state.auth]);

  useEffect(() => {
    setTheme(state.theme.mode as string);
  }, [state.theme.mode]);

  return null;
}
