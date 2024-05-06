import { NavMobile } from './nav-mobile';
import { NavOption } from './nav-options';
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
        {/* Top Center Nav - Desktop mode nav, hides when not in desktop mode */}
        <NavTop />

        {/* Mobile Nav - Clicking on hamburger icon will bring out a slider */}
        <NavMobile
          mobileSettings={mobileSettings}
          siteSettings={siteSettings}
        />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none" />
          <nav className="flex items-center">
            <ThemeModeToggle />
            <ThemeSelector themes={themes} />
            <NavOption />
          </nav>
        </div>
      </div>
    </header>
  );
}
