'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { mdiDotsVertical } from '@mdi/js';
import { Icon } from '@mdi/react';
import { type SiteSettings } from '@repo/dto';
import { cn } from '@repo/util';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/vendor-ui';

interface NavOptionProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function NavOption({ className, siteSettings }: NavOptionProps) {
  const pathname = usePathname();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 items-center justify-center rounded-full">
            <div className="text-primary">
              <Icon path={mdiDotsVertical} size={1} />
            </div>
            <span className="sr-only">Toggle option Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {siteSettings.navOptionLinks.map((oItem, idx) => (
            <DropdownMenuItem key={`${oItem.title}-${oItem.href}`}>
              <DropdownMenuLabel
                className={cn(
                  'hover:text-foreground/80 transition-colors',
                  pathname.startsWith(oItem.href) ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                <div className="flex items-center">
                  {oItem.icon ? (
                    <Icon path={oItem.icon} className="text-primary mr-1 h-6 w-6" />
                  ) : null}
                  <span>{oItem.title}</span>
                </div>
              </DropdownMenuLabel>
              {idx < siteSettings.navOptionLinks.length && <DropdownMenuSeparator />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
