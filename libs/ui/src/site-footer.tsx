import Link from 'next/link';
import { Icon } from '@mdi/react';
import { cn } from '@repo/util';
import { buttonVariants } from '@repo/vendor-ui';
import { type SiteSettings } from './site-types';

interface MainHeaderProps {
  siteSettings: SiteSettings;
  className?: string;
}

export function SiteFooter({ siteSettings, className }: MainHeaderProps) {
  return (
    <div className={cn('border-t py-6 md:px-8 md:py-0', className)}>
      <footer>
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            Built by Showcase UI, A Neekware Inc. Project.
            {siteSettings.footerSocialLinks.map((sItem) => {
              return (
                <Link
                  key={sItem.title}
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
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
