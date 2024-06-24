'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import type { SiteSettings } from '@lib/data-model-shared';
import { useAppState } from '@lib/data-store-next';
import { useToast } from '@lib/ui-vendor-next';

interface AppInitProps {
  siteSettings: SiteSettings;
}

export function AppInit({ siteSettings }: AppInitProps): null {
  const router = useRouter();
  const [state] = useAppState();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [prevIsLoggedIn, setPrevIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [initialLoad, setInitialLoad] = useState(true);
  const [accessToken, setAccessToken] = useState<string>('');

  const { urls } = siteSettings;

  useEffect(() => {
    if (initialLoad) {
      if (state.auth.isLoggedIn) {
        router.push(urls.site.home);
        router.refresh();
      }
      setPrevIsLoggedIn(state.auth.isLoggedIn);
      setInitialLoad(false);
    } else {
      if (prevIsLoggedIn && !state.auth.isLoggedIn) {
        toast({
          title: 'Logout Successful',
          description: 'See you soon ...',
          timeout: 20000,
          variant: 'info',
        });
        router.push(urls.site.auth.login);
        router.refresh();
      }
      setPrevIsLoggedIn(state.auth.isLoggedIn);
    }
  }, [state.auth, initialLoad, prevIsLoggedIn]);

  useEffect(() => {
    setTheme(state.theme.mode as string);
  }, [state.theme.mode]);

  return null;
}
