import * as React from 'react';
import { type MobileSettings, type SiteSettings } from '@lib/data-model-shared';
import { cn } from '@lib/ui-util-next';
import { NavDesktop } from './nav-desktop';
import { NavMobile } from './nav-mobile';
import { NavOption } from './nav-options';
import { SiteLogo } from './site-logo';
import { ThemeModeToggle } from './theme-toggle';

interface MainHeaderProps {
  siteSettings: SiteSettings;
  mobileSettings: MobileSettings;
  className?: string;
}

export function SiteHeader({ mobileSettings, siteSettings, className }: MainHeaderProps) {
  return (
    <div
      className={cn(
        'supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur',
        className
      )}
    >
      <header>
        <nav className="px-0 py-4">
          <div className="container flex items-center justify-between">
            {/* Burger Menu and Slider */}
            <NavMobile
              data-tag="mobile-nav"
              mobileSettings={mobileSettings}
              siteSettings={siteSettings}
              className="md:hidden"
            />

            {/* Site Name and Logo */}
            <SiteLogo siteSettings={siteSettings} />

            {/* Top Center Nav - Desktop mode nav, hides when not in desktop mode */}
            <NavDesktop siteSettings={siteSettings} className="hidden md:flex" />

            {/* Option Menu */}
            <div className="flex">
              <ThemeModeToggle className="" />
              <NavOption siteSettings={siteSettings} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
