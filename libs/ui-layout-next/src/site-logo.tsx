import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type SiteSettings } from '@lib/data-model-shared';
import { cn } from '@lib/ui-vendor-next';

interface SiteLogoProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function SiteLogo({ className, siteSettings }: SiteLogoProps) {
  return (
    <div className={cn('hover:text-foreground/80 space-x-2 transition-colors', className)}>
      <Link className="flex items-center gap-2" href="/">
        {siteSettings.icon ? (
          <Image src={siteSettings.icon} height={24} width={24} alt="Showcase UI" />
        ) : null}
        <span className="text-lg font-semibold">{siteSettings.name}</span>
      </Link>
    </div>
  );
}
