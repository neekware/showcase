'use client';

import * as React from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { type MobileSettings, type SiteSettings } from '@lib/data-model-shared';
import { hrefToString } from '@lib/data-util-shared';
import { Icon, mdiClose, mdiMenu } from '@lib/ui-icon-next';
import { Button, cn, ScrollArea, Sheet, SheetContent, SheetTrigger } from '@lib/ui-vendor-next';
import { SiteLogo } from './site-logo';

interface LinkMobileProps extends LinkProps {
  onOpenChange?: (_open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function LinkMobile({ href, onOpenChange, className, children, ...props }: LinkMobileProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
        router.push(hrefToString(href));
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
  className?: string;
}

export function NavMobile({ className, mobileSettings, siteSettings }: NavMobileProps) {
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked(true);
    setOpen(!open);
  };

  let animationClass = '';
  if (clicked) {
    if (open) {
      animationClass = 'animate-spin-clockwise';
    } else {
      animationClass = 'animate-spin-counter-clockwise';
    }
  }

  return (
    <div className={cn('p-0', className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={handleClick}
            variant="ghost"
            className="flex size-8 items-center justify-center rounded-full"
          >
            <div className={cn('text-primary', animationClass)}>
              {open ? (
                <Icon path={mdiClose} className="size-6" />
              ) : (
                <Icon path={mdiMenu} className="size-6" />
              )}
            </div>
            <span className="sr-only">Toggle Mobile Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="mt-[65px] border-t pr-0"
          classNameSheetOverlay="mt-[65px]"
        >
          <LinkMobile
            href="/"
            className="mr-6 flex items-center space-x-2 pb-4"
            onOpenChange={setOpen}
          >
            <SiteLogo siteSettings={siteSettings} className="pr-20" />
          </LinkMobile>
          <ScrollArea className="my-4 h-[calc(100vh-2rem)] pb-10 pl-1">
            <div className="flex flex-col space-y-3">
              {mobileSettings.topNav.map(
                (item) =>
                  item.href && (
                    <LinkMobile key={item.href} href={item.href} onOpenChange={setOpen}>
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
    </div>
  );
}
