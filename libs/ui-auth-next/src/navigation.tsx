'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import type { SiteSettings } from '@lib/data-model-shared';
import { useAppState } from '@lib/data-store-next';
import { isSessionValid } from '@lib/ui-util-next';

interface NavigationEventsProps {
  settings: SiteSettings;
}

export function NavigationEvents({ settings }: NavigationEventsProps): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setAppState] = useAppState();
  const [lastPath, setLastPath] = useState('');
  const url = `${pathname}?${searchParams}`;

  useEffect(() => {
    if (lastPath !== url) {
      isSessionValid(settings.sessionName || 'aTc').then((session) => {
        if (session) {
          setAppState({ isLoggedIn: true });
        } else {
          setAppState({ isLoggedIn: false });
        }
      });

      setLastPath(url);
      logger.info('NavigationComplete', url);
    }
  }, [pathname, searchParams]);

  return <></>;
}
