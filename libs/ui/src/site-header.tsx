import { type MobileSettings, type SiteSettings } from '@repo/ag-dto';
import { cn } from '@repo/util';
import { NavDesktop } from './nav/nav-desktop';
import { NavMobile } from './nav/nav-mobile';
import { NavOption } from './nav/nav-options';
import { NavSite } from './nav/nav-site';
import { ThemeModeToggle } from './theme/theme-toggle';

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
              mobileSettings={mobileSettings}
              siteSettings={siteSettings}
              className="md:hidden"
            />

            {/* Site Name and Logo */}
            <NavSite siteSettings={siteSettings} />

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
