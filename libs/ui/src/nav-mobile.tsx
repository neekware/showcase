'use client';

import * as React from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { mdiMenu } from '@mdi/js';
import { Icon } from '@mdi/react';
import { cn, hrefToString } from '@repo/util';
import {
  Button,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@repo/vendor-ui';
import { type MobileSettings } from './nav-types';
import { type SiteSettings } from './site-types';

interface LinkMobileProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function LinkMobile({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkMobileProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(hrefToString(href));
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

interface NavMobileProps {
  mobileSettings: MobileSettings;
  siteSettings: SiteSettings;
}

export function NavMobile({ mobileSettings, siteSettings }: NavMobileProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
          variant="ghost"
          className="flex size-8 items-center justify-center rounded-full md:hidden"
        >
          <div className="text-primary">
            <Icon path={mdiMenu} size={1} />
          </div>
          <span className="sr-only">Toggle option Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="border-t pr-0">
        <LinkMobile
          href="/"
          className="mr-6 flex items-center space-x-2"
          onOpenChange={setOpen}
        >
          {siteSettings.icon ? (
            <Icon path={siteSettings.icon} className="h-6 w-6" />
          ) : null}
          <span className="font-bold">{siteSettings.name}</span>
        </LinkMobile>
        <ScrollArea className="my-4 h-[calc(100vh-2rem)] pb-10 pl-1">
          <div className="flex flex-col space-y-3">
            {mobileSettings.topNav.map(
              (item) =>
                item.href && (
                  <LinkMobile
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </LinkMobile>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2">
            {mobileSettings.navSidebar.map((item) => (
              <div key={item.title} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item.items.length
                  ? item.items.map((subItem) => (
                      <React.Fragment key={subItem.href}>
                        {!subItem.disabled &&
                          (subItem.href ? (
                            <LinkMobile
                              href={subItem.href}
                              onOpenChange={setOpen}
                              className="text-muted-foreground pl-4"
                            >
                              {subItem.title}
                            </LinkMobile>
                          ) : (
                            subItem.title
                          ))}
                      </React.Fragment>
                    ))
                  : null}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
