'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash-es';
import { useToast } from '@repo/nx-ui-vendor';
import { useAppState } from '@repo/nx-util';

export function AppInit(): null {
  const router = useRouter();
  const [state] = useAppState();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [prevIsLoggedIn, setPrevIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [initialLoad, setInitialLoad] = useState(true);

  // create debounced functions for setting prevIsLoggedIn and initialLoad once
  const debouncedSetPrevIsLoggedIn = useMemo(() => debounce(setPrevIsLoggedIn, 300), []);
  const debouncedSetInitialLoad = useMemo(() => debounce(setInitialLoad, 300), []);

  useEffect(() => {
    if (initialLoad) {
      if (state.auth.isLoggedIn) {
        router.push('/');
      }
      debouncedSetPrevIsLoggedIn(state.auth.isLoggedIn);
      debouncedSetInitialLoad(false);
    } else {
      if (!prevIsLoggedIn && state.auth.isLoggedIn) {
        toast({
          title: 'Login Successful',
          description: 'Redirecting ...',
          timeout: 5000,
        });
        router.push('/');
      } else if (prevIsLoggedIn && !state.auth.isLoggedIn) {
        toast({
          title: 'Logout Successful',
          description: 'Redirecting ...',
          timeout: 5000,
        });
        router.push('/');
      }
      debouncedSetPrevIsLoggedIn(state.auth.isLoggedIn);
    }
  }, [
    state.auth,
    initialLoad,
    prevIsLoggedIn,
    debouncedSetPrevIsLoggedIn,
    debouncedSetInitialLoad,
  ]);

  useEffect(() => {
    setTheme(state.theme.mode as string);
  }, [state.theme.mode]);

  return null;
}
