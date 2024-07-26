'use client';

import { Suspense, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import type { SiteSettings } from '@lib/data-model-shared';
import { useAppState } from '@lib/data-store-next';
import { NavigationEvents } from '@lib/ui-auth-next';

interface AppInitProps {
  siteSettings: SiteSettings;
}

export function AppInit({ siteSettings }: AppInitProps): JSX.Element {
  const router = useRouter();
  const [state] = useAppState();
  const { setTheme } = useTheme();
  const [prevIsLoggedIn, setPrevIsLoggedIn] = useState(state.isLoggedIn);

  const { urls } = siteSettings;
  const isAuth = prevIsLoggedIn && !state.isLoggedIn;

  useEffect(() => {
    if (isAuth) {
      logger.info('User logged out', window.location.href);
    }
    setPrevIsLoggedIn(state.isLoggedIn);
  }, [state]);

  useEffect(() => {
    setTheme(state.mode as string);
  }, [state.mode]);

  return (
    <>
      <Suspense>
        <NavigationEvents settings={siteSettings} />
      </Suspense>
    </>
  );
}
