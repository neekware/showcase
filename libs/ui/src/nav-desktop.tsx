import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@repo/util';
import { type SiteSettings } from './site-types';

interface NavTopProps {
  siteSettings: SiteSettings;
  className?: string;
}
export function NavDesktop({ className, siteSettings }: NavTopProps) {
  const pathname = usePathname();

  return (
    <div className={cn('space-x-4', className)}>
      {siteSettings.navTopLinks.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname === link.href ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
