import { cn } from '@repo/util';
import { NavDesktop } from './nav-desktop';
import { NavMobile } from './nav-mobile';
import { NavOption } from './nav-options';
import { NavSite } from './nav-site';
import { type MobileSettings } from './nav-types';
import { type SiteSettings } from './site-types';
import { ThemeSelector } from './theme-selector';
import { ThemeModeToggle } from './theme-toggle';
import { type Theme } from './theme-types';

interface MainHeaderProps {
  themes: Theme[];
  siteSettings: SiteSettings;
  mobileSettings: MobileSettings;
  className?: string;
}

export function SiteHeader({
  mobileSettings,
  siteSettings,
  themes,
  className,
}: MainHeaderProps) {
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
              mobileSettings={mobileSettings}
              siteSettings={siteSettings}
              className="md:hidden"
            />

            {/* Site Name and Logo */}
            <NavSite siteSettings={siteSettings} />

            {/* Top Center Nav - Desktop mode nav, hides when not in desktop mode */}
            <NavDesktop
              siteSettings={siteSettings}
              className="hidden md:flex"
            />

            {/* Option Menu */}
            <div className="flex">
              <ThemeModeToggle className="hidden md:flex" />
              <ThemeSelector themes={themes} className="hidden md:flex" />
              <NavOption siteSettings={siteSettings} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
