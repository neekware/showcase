'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { mdiDotsVertical } from '@mdi/js';
import { Icon } from '@mdi/react';
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

export function NavOption() {
  const pathname = usePathname();

  return (
    <div className="mr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 items-center justify-center rounded-full"
          >
            <div className="text-primary">
              <Icon path={mdiDotsVertical} size={1} />
            </div>
            <span className="sr-only">Toggle option Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel
            className={cn(
              'hover:text-foreground/80 transition-colors',
              pathname.startsWith('/examples')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={cn(
              'hover:text-foreground/80 transition-colors',
              pathname.startsWith('/examples')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              'hover:text-foreground/80 transition-colors',
              pathname.startsWith('/examples')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={cn(
              'hover:text-foreground/80 transition-colors',
              pathname.startsWith('/examples')
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
