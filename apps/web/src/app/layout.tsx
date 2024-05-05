import {
  Breakpoints,
  SiteFooter,
  SiteHeader,
  ThemeProvider,
  ThemeSelector,
} from '@repo/ui';
import { fontSans } from '@web/cfg/fonts';
import { mobileSettings } from '../cfg/mobile';
import { siteSettings } from '../cfg/site';
import { availableThemes } from '../cfg/themes';
import '../styles/base.css';
import '../styles/globals.css';
import '../styles/themes.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader
              themes={availableThemes}
              siteSettings={siteSettings}
              mobileSettings={mobileSettings}
            />
            <div className="flex-1">{children}</div>
            <SiteFooter siteSettings={siteSettings} />
          </div>
          <Breakpoints />
        </ThemeProvider>
        <ThemeSelector themes={availableThemes} />
      </body>
    </html>
  );
}
