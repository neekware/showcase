import Link from 'next/link';

import { cn } from '@showcase/utils';

import { Icons } from './icons';
import { SiteConfig } from './types';

interface NavbarProps extends SiteConfig {}

export function Navbar(config: NavbarProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{config.name}</span>
      </Link>
      {config?.navItems?.length ? (
        <nav className="flex gap-6">
          {config?.navItems?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'text-muted-foreground flex items-center text-sm font-medium',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
