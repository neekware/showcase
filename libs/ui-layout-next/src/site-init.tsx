'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import type { SiteSettings } from '@lib/data-model-shared';
import { useAppState } from '@lib/data-store-next';
import { useToast } from '@lib/ui-vendor-next';
import { logger } from '../../data-logger-shared';

interface AppInitProps {
  siteSettings: SiteSettings;
}

export function AppInit({ siteSettings }: AppInitProps): null {
  const router = useRouter();
  const [state] = useAppState();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [prevIsLoggedIn, setPrevIsLoggedIn] = useState(state.isLoggedIn);

  const { urls } = siteSettings;

  useEffect(() => {
    if (!prevIsLoggedIn && state.isLoggedIn) {
      toast({
        title: 'Login Successful',
        description: 'Enjoy looking around ...',
        timeout: 20000,
        variant: 'success',
      });
    } else if (prevIsLoggedIn && !state.isLoggedIn) {
      toast({
        title: 'Logout Successful',
        description: 'See you soon ...',
        timeout: 20000,
        variant: 'info',
      });
      logger.info('User logged out', window.location.href);
      router.push(urls.site.auth.login);
    }
    setPrevIsLoggedIn(state.isLoggedIn);
  }, [state]);

  useEffect(() => {
    setTheme(state.mode as string);
  }, [state.mode]);

  return null;
}
