import Link from 'next/link';
import { Icon } from '@mdi/react';
import { type LinkItem, type SiteSettings } from '@repo/dto';
import { cn } from '@repo/util';
import { buttonVariants } from '@repo/vendor-ui';
import { NavSite } from './nav-site';

interface MainHeaderProps {
  siteSettings: SiteSettings;
  className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter({ className, siteSettings }: MainHeaderProps) {
  return (
    <div className={cn('border-t', className)}>
      <footer>
        <div className="text-muted-foreground container flex flex-col items-center justify-between text-center leading-loose md:flex-row">
          <NavSite siteSettings={siteSettings} />
          <div className="">
            <div>© 2023-{CURRENT_YEAR} Neekware Inc.</div>
            <div>Built by Showcase UI.</div>
          </div>
          <div className="">
            {siteSettings.footerSocialLinks.map((sItem: LinkItem) => {
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
