import type { ComponentType } from 'react';
import { redirect } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import type { SiteSettings } from '@lib/data-model-shared';
import { getSession } from './session';

export const authGuard = (
  WrappedComponent: ComponentType<any>,
  settings?: SiteSettings,
  nextUrl = '/'
) => {
  const AuthGuardComponent = async (props: any) => {
    const session = await getSession(settings?.sessionName || 'aTc');

    if (session) {
      return <WrappedComponent {...props} settings={settings} />;
    }

    logger.warn('AuthGuard: Redirecting to login page');

    redirect(`${settings?.urls.site.auth.login}?nextUrl=${nextUrl}`);
  };

  return AuthGuardComponent;
};
