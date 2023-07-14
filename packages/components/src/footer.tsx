import { SiteConfig } from '@showcase/components';
import { siteIcons } from '@showcase/components';
import { cn } from '@showcase/utils';

import { ThemeToggle } from './themeToggle';

export interface SiteFooterProps {
  siteConfig: SiteConfig;
  className?: string;
}

export function Footer({ siteConfig, className }: SiteFooterProps) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <siteIcons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn
            </a>
            . Hosted on{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Illustrations by{' '}
            <a
              href="https://popsy.co"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Popsy
            </a>
            . The source code is available on{' '}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
}
