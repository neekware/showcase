import { Suspense } from 'react';
import { I18nProvider } from '@lib/data-i18n-shared';
import { logger, LogLevel } from '@lib/data-logger-shared';
import { StateStoreProvider } from '@lib/data-store-next';
import {
  AppInit,
  Breakpoints,
  SiteFooter,
  SiteHeader,
  ThemeProvider,
  ThemeSwap,
} from '@lib/ui-layout-next';
import { cn, Toaster } from '@lib/ui-vendor-next';
import { fontRoboto, metaSettings, mobileSettings, siteSettings } from '@web/cfg';
import '@web/styles/styles.css';

export const generateMetadata = () => metaSettings;

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  logger.setLogLevel(LogLevel.critical);

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={cn('flex min-h-screen flex-col', fontRoboto.variable)}>
        <I18nProvider>
          <StateStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative z-50 flex min-h-screen w-full flex-col border-b">
                {/* <!-- Navbar --> */}
                <SiteHeader
                  siteSettings={siteSettings}
                  mobileSettings={mobileSettings}
                  className="sticky top-0 mb-10"
                />

                {/* <!-- Main Content --> */}
                <Suspense fallback={<div>Loading...</div>}>
                  <main className="container mx-auto flex-1 flex-grow !px-2 py-2">{children}</main>
                </Suspense>

                {/* <!-- Footer --> */}
                <SiteFooter siteSettings={siteSettings} className="container mx-auto mt-10 py-4" />
              </div>

              <AppInit siteSettings={siteSettings} />
              <Toaster classNameViewPort="bottom-0" />
              <Breakpoints />
            </ThemeProvider>
            <ThemeSwap />
          </StateStoreProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
