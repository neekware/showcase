import { ReactNode } from 'react';

import Link from 'next/link';

import { useLockBody } from '@showcase/utils';
import { cn } from '@showcase/utils';

import { siteIcons } from './icons';
import { NavItem, SiteConfig } from './types';

interface MobileNavProps {
  siteConfig: SiteConfig;
  items: NavItem[];
  children?: ReactNode;
}

export function MobileNav({ items, siteConfig, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        'animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'
      )}
    >
      <div className="bg-popover text-popover-foreground relative z-20 grid gap-6 rounded-md p-4 shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <siteIcons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
