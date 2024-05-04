import Link from 'next/link';
import { Icon } from '@mdi/react';
import { cn } from '@repo/util';
import { buttonVariants } from '@repo/vendor-ui';
import { NavMobile } from './nav-mobile';
import { NavTop } from './nav-top';
import { type MobileSettings } from './nav-types';
import { type SiteSettings } from './site-types';
import { ThemeSelector } from './theme-selector';
import { ThemeModeToggle } from './theme-toggle';
import { type Theme } from './theme-types';

interface MainHeaderProps {
  themes: Theme[];
  siteSettings: SiteSettings;
  mobileSettings: MobileSettings;
}

export function SiteHeader({
  mobileSettings,
  siteSettings,
  themes,
}: MainHeaderProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <NavTop />
        <NavMobile
          mobileSettings={mobileSettings}
          siteSettings={siteSettings}
        />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none" />
          <nav className="flex items-center">
            {siteSettings.socials.map((sItem) => {
              return (
                <Link
                  key={sItem.title}
                  href={sItem.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={cn(
                      buttonVariants({
                        variant: 'link',
                      }),
                      'w-9 px-0'
                    )}
                  >
                    {sItem.icon ? (
                      <Icon path={sItem.icon} className="h-6 w-6" />
                    ) : null}
                    {sItem.label ? (
                      <span className="sr-only">{sItem.label}</span>
                    ) : null}
                  </div>
                </Link>
              );
            })}
            <ThemeModeToggle />
            <ThemeSelector themes={themes} />
          </nav>
        </div>
      </div>
    </header>
  );
}
