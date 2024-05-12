import * as React from 'react';
import { type SiteSettings } from '@repo/dto';
import { cn } from '@repo/util';
import { ThemeSelector } from '../theme/theme-selector';

interface FooterPreferencesProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function FooterPreferences({
  siteSettings,
  className,
}: FooterPreferencesProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <h2 className="mb-2 text-base font-semibold">Preferences</h2>
      <ul className="m-0 grid list-none space-y-1 border-t p-0 pb-2 pt-4 md:flex-col md:border-none md:pb-0 xl:grid-cols-2">
        <li key="theme" className="flex items-center">
          <ThemeSelector
            themes={siteSettings.themes}
            className="text-foreground/60 hover:text-foreground size-8 rounded-full transition-colors focus:outline-none ltr:-ml-2"
          />
          <div className="capitalize">Themes</div>
        </li>
      </ul>
    </div>
  );
}
