import {
  AppInitComponent,
  Breakpoints,
  SiteFooter,
  SiteHeader,
  ThemeProvider,
  ThemeSwap,
} from '@repo/ui';
import { fontRoboto } from '../cfg/fonts';
import { mobileSettings } from '../cfg/mobile';
import { siteSettings } from '../cfg/site';
import '../styles/base.css';
import '../styles/globals.css';
import '../styles/themes.css';

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" dir="ltr">
      <body className={fontRoboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppInitComponent />
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
      </body>
    </html>
  );
}
