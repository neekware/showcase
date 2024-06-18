'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from '@lib/data-store-next';
import {
  Icon,
  mdiAccount,
  mdiCog,
  mdiCreditCard,
  mdiDotsVertical,
  mdiKeyboard,
  mdiLogin,
  mdiLogout,
} from '@lib/ui-icon-next';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@lib/ui-vendor-next';

// interface NavOptionProps {
//   siteSettings: SiteSettings;
//   className?: string;
// }

export function NavOption() {
  const [auth, setAuthState] = useAuthState();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    // Fire and forget, let's log the user out and redirect
    setAuthState({ isLoggedIn: false, token: '' });
  };

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex size-8 items-center justify-center rounded-full">
          <div className="text-primary">
            <Icon path={mdiDotsVertical} size={1} />
          </div>
          <span className="sr-only">Toggle option Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2 w-48">
        <DropdownMenuLabel>{auth.isLoggedIn ? 'My Account' : 'Options'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon path={mdiAccount} className="size-4" />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Icon path={mdiCreditCard} className="size-4" />
              <span>Billing</span>
            </div>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Icon path={mdiCog} className="size-4" />
              <span>Settings</span>
            </div>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Icon path={mdiKeyboard} className="size-4" />
              <span>Shortcuts</span>
            </div>
            <DropdownMenuShortcut className="text-right">⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {auth.isLoggedIn ? (
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2"
            >
              <Icon path={mdiLogout} className="size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                router.push('/auth/login');
              }}
              className="flex cursor-pointer items-center gap-2"
            >
              <Icon path={mdiLogin} className="size-4" />
              <span>Login</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
