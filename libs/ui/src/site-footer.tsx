import * as React from 'react';
import Link from 'next/link';
import { mdiMonitor, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { Icon } from '@mdi/react';
import { type LinkItem, type SiteSettings, type Theme } from '@repo/dto';
import { cn, useThemeState } from '@repo/util';
import { Button, buttonVariants } from '@repo/vendor-ui';
import { NavSite } from './nav-site';
import { ThemeSelector } from './theme-selector';

interface MainHeaderProps {
  siteSettings: SiteSettings;
  themes: Theme[];
  className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter({
  siteSettings,
  themes,
  className,
}: MainHeaderProps) {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setThemeState] = useThemeState();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className={cn('border-t px-5 py-4', className)}>
      <nav
        aria-label={`${siteSettings.name} Directory`}
        role="navigation"
        className="mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {/* <!-- Logo and contact section --> */}
          <div className="flex flex-col items-start gap-2">
            {/* Site Name and Logo */}
            <NavSite siteSettings={siteSettings} />
            <p className="whitespace-nowrap text-base text-base font-semibold leading-6">
              © {CURRENT_YEAR}
            </p>
            <Link
              href="/"
              rel="noopener"
              className="flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-700"
            >
              {/* <!-- Status Indicator Elements --> */}
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <small>All systems normal.</small>
            </Link>
            {/* <!-- Social Section --> */}
            <span className="mb-4 mt-auto flex">
              <ul className="m-0 inline-flex list-none items-center p-0 pl-1">
                {siteSettings.footer.social.map((sItem: LinkItem) => {
                  return (
                    <li key={sItem.title} className="m-0 rounded-full p-0 pr-2">
                      <Button
                        variant="ghost"
                        className="flex size-8 items-center justify-center rounded-full"
                      >
                        <Link
                          href={sItem.href}
                          target="_blank"
                          rel="noreferrer"
                          className="focus:outline-none"
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
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </span>
          </div>

          {/* <!-- Products Section --> */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-base font-semibold">Product</h2>
            <ul className="m-0 flex list-none space-y-1 p-0 pb-2 md:flex-col md:pb-0 xl:grid xl:grid-cols-2">
              {siteSettings.footer.product.map((pItem: LinkItem) => {
                return (
                  <li key={pItem.title}>
                    <Link
                      href={pItem.href}
                      className="text-foreground/60 hover:text-foreground transition-colors focus:outline-none"
                    >
                      {pItem.label ?? pItem.title}
                      <div>
                        {pItem.icon ? (
                          <Icon path={pItem.icon} className="h-6 w-6" />
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <!-- Resources Section --> */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-base font-semibold">Resources</h2>
            <ul className="m-0 flex list-none space-y-1 p-0 pb-2 md:flex-col md:pb-0 xl:grid xl:grid-cols-2">
              {siteSettings.footer.resources.map((pItem: LinkItem) => {
                return (
                  <li key={pItem.title}>
                    <Link
                      href={pItem.href}
                      className="text-foreground/60 hover:text-foreground transition-colors focus:outline-none"
                    >
                      {pItem.label ?? pItem.title}
                      <div>
                        {pItem.icon ? (
                          <Icon path={pItem.icon} className="h-6 w-6" />
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <!-- Company Section --> */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-base font-semibold">Company</h2>
            <ul className="m-0 flex list-none space-y-1 p-0 pb-2 md:flex-col md:pb-0 xl:grid xl:grid-cols-2">
              {siteSettings.footer.company.map((pItem: LinkItem) => {
                return (
                  <li key={pItem.title}>
                    <Link
                      href={pItem.href}
                      className="text-foreground/60 hover:text-foreground transition-colors focus:outline-none"
                    >
                      {pItem.label ?? pItem.title}
                      <div>
                        {pItem.icon ? (
                          <Icon path={pItem.icon} className="h-6 w-6" />
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <!-- Company Section --> */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-base font-semibold">Preferences</h2>
            <div className="m-0 flex list-none space-y-1 p-0 pb-2 md:flex-col md:pb-0 xl:grid xl:grid-cols-3">
              <div className="grid grid-cols-3 gap-2">
                {mounted ? (
                  <>
                    <Button
                      onClick={() => {
                        setThemeState({ mode: 'light' });
                      }}
                      variant="ghost"
                      className={cn(
                        'flex size-9 items-center justify-center rounded-full',
                        theme.mode === 'light'
                          ? 'text-foreground/80 border'
                          : 'text-foreground/60'
                      )}
                    >
                      <div className="text-primary">
                        <Icon path={mdiWeatherSunny} size={1} />
                      </div>
                      <span className="sr-only">Light theme</span>
                    </Button>

                    <Button
                      onClick={() => {
                        setThemeState({ mode: 'system' });
                      }}
                      variant="ghost"
                      className={cn(
                        'flex size-9 items-center justify-center rounded-full',
                        theme.mode === 'system'
                          ? 'text-foreground/80 border'
                          : 'text-foreground/60'
                      )}
                    >
                      <div className="text-primary">
                        <Icon path={mdiMonitor} size={1} />
                      </div>
                      <span className="sr-only">System theme</span>
                    </Button>

                    <Button
                      onClick={() => {
                        setThemeState({ mode: 'dark' });
                      }}
                      variant="ghost"
                      className={cn(
                        'flex size-9 items-center justify-center rounded-full',
                        theme.mode === 'dark'
                          ? 'text-foreground/80 border'
                          : 'text-foreground/60'
                      )}
                    >
                      <div className="text-primary">
                        <Icon path={mdiWeatherNight} size={1} />
                      </div>
                      <span className="sr-only">Dark theme</span>
                    </Button>
                    <ThemeSelector
                      themes={themes}
                      className="flex size-8 items-center justify-center rounded-full"
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}
