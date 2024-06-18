import * as React from 'react';
import { type SiteSettings } from '@lib/data-model-shared';
import { cn } from '@lib/ui-util-next';
import { FooterCategory } from './footer-category';
import { FooterPreferences } from './footer-preference';
import { FooterSite } from './footer-site';
import { FooterSocial } from './footer-social';

interface MainHeaderProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function SiteFooter({ siteSettings, className }: MainHeaderProps) {
  return (
    <footer className={cn('border-t px-5 py-4 pb-10', className)}>
      <nav
        aria-label={`${siteSettings.name} Directory`}
        role="navigation"
        className="mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="flex h-full flex-col">
            {/* <!-- Site & Icon --> */}
            <FooterSite siteSettings={siteSettings} />

            {/* <!-- Desktop Social --> */}
            <FooterSocial
              listItems={siteSettings.footer.social}
              className="-mx-3.5 hidden md:mt-auto md:block"
            />
          </div>

          {/* <!-- Products Section --> */}
          <FooterCategory category="Product" listItems={siteSettings.footer.product} />

          <FooterCategory category="Resources" listItems={siteSettings.footer.resources} />

          <FooterCategory category="Company" listItems={siteSettings.footer.company} />

          {/* <!-- Preferences Section --> */}
          <FooterPreferences siteSettings={siteSettings} />

          {/* <!-- Mobile Social --> */}
          <FooterSocial listItems={siteSettings.footer.social} className="-mx-5 block md:hidden" />
        </div>
      </nav>
    </footer>
  );
}
