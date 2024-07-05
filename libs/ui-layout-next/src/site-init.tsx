'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import type { SiteSettings } from '@lib/data-model-shared';
import { useAppState } from '@lib/data-store-next';
import { RedirectComponent } from '@lib/ui-util-next';
import { useToast } from '@lib/ui-vendor-next';
import { logger } from '../../data-logger-shared';

interface AppInitProps {
  siteSettings: SiteSettings;
}

export function AppInit({ siteSettings }: AppInitProps): JSX.Element {
  const router = useRouter();
  const [state] = useAppState();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const [prevIsLoggedIn, setPrevIsLoggedIn] = useState(state.isLoggedIn);

  const { urls } = siteSettings;
  const isAuth = prevIsLoggedIn && !state.isLoggedIn;

  useEffect(() => {
    if (isAuth) {
      toast({
        title: 'Logout Successful',
        description: 'See you soon ...',
        timeout: 3000,
        variant: 'info',
      });
      logger.info('User logged out', window.location.href);
    }
    setPrevIsLoggedIn(state.isLoggedIn);
  }, [state]);

  useEffect(() => {
    setTheme(state.mode as string);
  }, [state.mode]);

  return <RedirectComponent redirect={urls.site.auth.login} go={isAuth} />;
}
