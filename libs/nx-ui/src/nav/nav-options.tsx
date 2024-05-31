'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  mdiAccount,
  mdiCog,
  mdiCreditCard,
  mdiDotsVertical,
  mdiKeyboard,
  mdiLogin,
  mdiLogout,
} from '@mdi/js';
import { Icon } from '@mdi/react';
import { type SiteSettings } from '@repo/ag-dto';
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
} from '@repo/nx-ui-vendor';
import { useAuthState } from '@repo/nx-util';

interface NavOptionProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function NavOption({ className, siteSettings }: NavOptionProps) {
  const [auth, setAuthState] = useAuthState();
  const pathname = usePathname();
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
    <DropdownMenu>
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
          <DropdownMenuItem>
            <Icon path={mdiAccount} className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiCreditCard} className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiCog} className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiKeyboard} className="mr-2 h-4 w-4" />
            <span>Shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {auth.isLoggedIn ? (
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <div className="flex items-center justify-between">
                <Icon path={mdiLogout} className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                router.push('/auth/login');
              }}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Icon path={mdiLogin} className="mr-2 h-4 w-4" />
                <span>Login</span>
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
