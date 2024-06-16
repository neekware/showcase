import { I18nProvider } from '@lib/data-i18n-shared';
import { StateStoreProvider } from '@lib/data-store-next';
import {
  AppInit,
  Breakpoints,
  SiteFooter,
  SiteHeader,
  ThemeProvider,
  ThemeSwap,
} from '@lib/ui-layout-next';
import { Toaster } from '@lib/ui-vendor-next';
import { fontRoboto, metaSettings, mobileSettings, siteSettings } from '@web/cfg';
import '@web/styles/base.css';
import '@web/styles/globals.css';
import '@web/styles/themes.css';

export const generateMetadata = () => metaSettings;

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={fontRoboto.className}>
        <I18nProvider>
          <StateStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppInit />
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader
                  siteSettings={siteSettings}
                  mobileSettings={mobileSettings}
                  className="mb-10"
                />
                <div className="flex-1 p-2">{children}</div>
                <SiteFooter siteSettings={siteSettings} className="mt-10 py-4" />
              </div>
              <Breakpoints />
              <Toaster classNameViewPort="bottom-0" />
            </ThemeProvider>
            <ThemeSwap />
          </StateStoreProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
