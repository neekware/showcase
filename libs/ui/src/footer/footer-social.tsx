import * as React from 'react';
import Link from 'next/link';
import { Icon } from '@mdi/react';
import { type LinkItem } from '@repo/dto';
import { cn } from '@repo/util';
import { Button, buttonVariants } from '@repo/vendor-ui';

interface FooterSocialProps {
  listItems: LinkItem[];
  className?: string;
}

export function FooterSocial({ listItems, className }: FooterSocialProps) {
  return (
    <div className={cn('mb-4 flex', className)}>
      <ul className="mx-3.5 inline-flex list-none items-center gap-2">
        {listItems.map((sItem: LinkItem) => (
          <li key={sItem.title} className="m-0 rounded-full p-0">
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
                <div className={cn(buttonVariants({ variant: 'link' }), 'w-9 px-0')}>
                  {sItem.icon ? <Icon path={sItem.icon} className="h-6 w-6" /> : null}
                  {sItem.label ? <span className="sr-only">{sItem.label}</span> : null}
                </div>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
