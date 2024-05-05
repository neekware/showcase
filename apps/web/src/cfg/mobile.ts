import { type MobileSettings } from '@repo/ui';

export const mobileSettings: MobileSettings = {
  topNav: [
    {
      title: 'Themes',
      href: '/themes',
    },
    {
      title: 'Examples',
      href: '/examples',
    },
    {
      title: 'GitHub',
      href: 'https://github.com/neekware',
      external: true,
    },
    {
      title: 'X',
      href: 'https://twitter.com/',
      external: true,
    },
  ],
  navSidebar: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'About',
          href: '/docs/about',
          items: [],
        },
      ],
    },
    {
      title: 'Dark Mode',
      items: [
        {
          title: 'NextJs',
          href: '/docs/dark-mode/next',
          items: [],
        },
      ],
    },
  ],
};
