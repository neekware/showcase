'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useAppState } from '@lib/data-store-next';
import { debounce } from '@lib/ui-util-next';
import { useToast } from '@lib/ui-vendor-next';

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
          description: 'Enjoy your tour ...',
          timeout: 20000,
          variant: 'success',
        });
        router.push('/');
      } else if (prevIsLoggedIn && !state.auth.isLoggedIn) {
        toast({
          title: 'Logout Successful',
          description: 'See you soon ...',
          timeout: 20000,
          variant: 'info',
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
