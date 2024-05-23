import Image from 'next/image';
import Link from 'next/link';
import { type SiteSettings } from '@repo/ag-dto';
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
        {siteSettings.icon ? (
          <Image priority src={siteSettings.icon} height={24} width={24} alt="Showcase UI" />
        ) : null}
        <span className="text-lg font-semibold">{siteSettings.name}</span>
      </Link>
    </div>
  );
}
