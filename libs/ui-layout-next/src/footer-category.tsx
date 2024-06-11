'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { type LinkItem } from '@lib/data-model-shared';
import { Icon } from '@lib/ui-icon-next';
import { cn } from '@lib/ui-util-next';

interface FooterCategoryProps {
  category: string;
  listItems: LinkItem[];
  className?: string;
}

export function FooterCategory({ className, category, listItems }: FooterCategoryProps) {
  const [showList, setShowList] = useState(false);

  return (
    <div className={cn('flex flex-col', className)}>
      <Link
        href="#"
        className="mb-2 text-base font-semibold"
        onClick={(event) => {
          event.preventDefault();
          setShowList(!showList);
        }}
      >
        <div className="flex gap-2 border-b pb-2 text-left md:border-0">
          {category}
          <span className={cn(showList ? 'hidden' : 'block', 'md:hidden')}>+</span>
        </div>
      </Link>
      <ul
        className={cn(
          `md:border-non m-0 grid list-none space-y-1 p-0 pb-2 pt-4 md:flex-col md:pb-0 xl:grid-cols-2 ${
            showList ? 'block' : 'hidden'
          }`,
          'md:block'
        )}
      >
        {listItems.map((item) => {
          return (
            <li key={`${category}-${item.title}`}>
              <Link
                href={item.href}
                className="text-foreground/60 hover:text-foreground transition-colors focus:outline-none"
              >
                <div className="flex gap-2">
                  {item.label ?? item.title}
                  {item.icon ? <Icon path={item.icon} className="size-6" /> : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
