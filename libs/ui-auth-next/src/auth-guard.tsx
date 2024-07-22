import type { ComponentType } from 'react';
import { redirect } from 'next/navigation';
import type { SiteSettings } from '@lib/data-model-shared';
import { getSession } from './session';

export const withAuth = (WrappedComponent: ComponentType<any>, settings?: SiteSettings) => {
  const WithAuthComponent = async (props: any) => {
    const session = await getSession(settings?.sessionName || 'aTc');

    if (session) {
      return <WrappedComponent {...props} settings={settings} />;
    }

    redirect('/auth/login');
  };

  return WithAuthComponent;
};
