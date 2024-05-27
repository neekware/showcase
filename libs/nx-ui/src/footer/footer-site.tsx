import React from 'react';
import Link from 'next/link';
import { type SiteSettings } from '@repo/ag-dto';
import { cn } from '@repo/nx-ui-vendor';
import { NavSite } from '../nav/nav-site';

interface FooterSiteProps {
  siteSettings: SiteSettings;
  className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export function FooterSite({ className, siteSettings }: FooterSiteProps) {
  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      {/* Site Name and Logo */}
      <div className="flex md:flex-col">
        <NavSite siteSettings={siteSettings} />
        <p className="mx-0.5 whitespace-nowrap text-base font-semibold">© {CURRENT_YEAR}</p>
      </div>
      <Link
        href="/"
        rel="noopener"
        className="mx-1 flex items-center gap-2 text-blue-500 transition-colors hover:text-blue-700"
      >
        {/* <!-- Status Indicator Elements --> */}
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <small>All systems normal</small>
      </Link>
    </div>
  );
}
