import { Provider as StateStoreProvider } from 'jotai';
import { fontRoboto } from '../cfg/fonts';
import { mobileSettings } from '../cfg/mobile';
import { metaSettings, siteSettings } from '../cfg/site';
import '../styles/base.css';
import '../styles/globals.css';
import '../styles/themes.css';
import { AppInit, Breakpoints, SiteFooter, SiteHeader, ThemeProvider, ThemeSwap } from '@repo/ui';

export const generateMetadata = () => metaSettings;

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" dir="ltr">
      <body className={fontRoboto.className}>
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
              <div className="flex-1">{children}</div>
              <SiteFooter siteSettings={siteSettings} className="mt-10 py-4" />
            </div>
            <Breakpoints />
          </ThemeProvider>
          <ThemeSwap />
        </StateStoreProvider>
      </body>
    </html>
  );
}
