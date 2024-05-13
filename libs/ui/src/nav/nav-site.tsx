import Link from 'next/link';
import { Icon } from '@mdi/react';
import { type SiteSettings } from '@repo/dto';
import { cn } from '@repo/util';

interface NavSiteProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function NavSite({ className, siteSettings }: NavSiteProps) {
  return (
    <div
      className={cn('hover:text-foreground/80 text-primary space-x-2 transition-colors', className)}
    >
      <Link className="flex items-center gap-2" href="/">
        {siteSettings.icon ? <Icon path={siteSettings.icon} className=" h-6 w-6" /> : null}
        <span className="text-lg font-semibold">{siteSettings.name}</span>
      </Link>
    </div>
  );
}
