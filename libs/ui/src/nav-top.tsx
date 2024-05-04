'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mdiBriefcaseAccountOutline } from '@mdi/js';
import { Icon } from '@mdi/react';
import { cn } from '@repo/util';

export function NavTop() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icon
          path={mdiBriefcaseAccountOutline}
          className="text-primary h-6 w-6"
        />
        <span className="hidden font-bold sm:inline-block">Showcase</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/docs"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname === '/docs' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Documentation
        </Link>
        <Link
          href="/docs/components"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.startsWith('/docs/components')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Components
        </Link>
        <Link
          href="/themes"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.startsWith('/themes')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Themes
        </Link>
        <Link
          href="/examples"
          className={cn(
            'hover:text-foreground/80 transition-colors',
            pathname.startsWith('/examples')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Examples
        </Link>
        <Link
          href="/"
          className={cn(
            'text-foreground/60 hover:text-foreground/80 hidden transition-colors lg:block'
          )}
        >
          GitHub
        </Link>
      </nav>
    </div>
  );
}
