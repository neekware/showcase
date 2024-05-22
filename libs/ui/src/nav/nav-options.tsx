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
import { type SiteSettings } from '@repo/dto';
import { useAuthState } from '@repo/util';
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
} from '@repo/vendor-ui';

interface NavOptionProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function NavOption({ className, siteSettings }: NavOptionProps) {
  const [auth] = useAuthState();
  const pathname = usePathname();
  const router = useRouter();

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
          <DropdownMenuItem
            onClick={() => {
              router.push('/auth/logout');
            }}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Icon path={mdiLogout} className="text-danger mr-2 h-4 w-4" />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// export function NavOptions({ className, siteSettings }: NavOptionProps) {
//   const pathname = usePathname();

//   return (
//     <div className={className}>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="flex size-8 items-center justify-center rounded-full">
//             <div className="text-primary">
//               <Icon path={mdiDotsVertical} size={1} />
//             </div>
//             <span className="sr-only">Toggle option Menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           {siteSettings.navOptionLinks.map((oItem, idx) => (
//             <DropdownMenuItem key={`${oItem.title}-${oItem.href}`}>
//               <DropdownMenuLabel
//                 className={cn(
//                   'hover:text-foreground/80 transition-colors',
//                   pathname.startsWith(oItem.href) ? 'text-foreground' : 'text-foreground/60'
//                 )}
//               >
//                 <div " className="flex items-center justify-between">
//                   {oItem.icon ? (
//                     <Icon path={oItem.icon} className="text-primary -ml-2 h-6 w-6 pr-1" />
//                   ) : null}
//                   <div className="">{oItem.title}</div>
//                 </div>
//               </DropdownMenuLabel>
//               {idx < siteSettings.navOptionLinks.length && <DropdownMenuSeparator />}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }
