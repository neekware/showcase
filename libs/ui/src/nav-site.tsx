import Link from 'next/link';
import { Icon } from '@mdi/react';
import { cn } from '@repo/util';
import { type SiteSettings } from './site-types';

interface NavSiteProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function NavSite({ className, siteSettings }: NavSiteProps) {
  return (
    <div className={cn('space-x-2', className)}>
      <Link className="flex items-center gap-4" href="#">
        {siteSettings.icon ? (
          <Icon path={siteSettings.icon} className="text-primary h-6 w-6" />
        ) : null}
        <span className="text-lg font-semibold">{siteSettings.name}</span>
      </Link>
    </div>
  );
}
