'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@lib/data-logger-shared';
import type { SiteSettings } from '@lib/data-model-shared';
import type { AxiosInstance } from '@lib/data-net-shared';
import { useAppState } from '@lib/data-store-next';
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
import { useAuthAxios } from '@lib/ui-util-next';
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

const logoutUser = async (logoutUrl: string, axiosAuth: AxiosInstance) => {
  try {
    const response = await axiosAuth.post(logoutUrl);
    return response;
  } catch (error) {
    logger.error('Error during logout:', error);
    return undefined;
  }
};

interface NavOptionProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function NavOption({ siteSettings, className }: NavOptionProps): JSX.Element {
  const { urls } = siteSettings;

  const axiosAuth = useAuthAxios(urls.site.base);
  const [auth, setAppState] = useAppState();
  const router = useRouter();

  const handleLogout = async () => {
    // Fire and forget, let's log the user out and redirect
    await logoutUser(urls.api.auth.logout, axiosAuth);

    setAppState({ isLoggedIn: false });
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
                router.push(urls.site.auth.login);
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
