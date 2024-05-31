import { type MobileSettings } from '@repo/ag-dto';

export const mobileSettings: MobileSettings = {
  topNav: [
    {
      title: 'Themes',
      href: '#',
    },
    {
      title: 'Examples',
      href: '#',
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
          href: '#',
          items: [],
        },
        {
          title: 'About',
          href: '#',
          items: [],
        },
      ],
    },
    {
      title: 'Dark Mode',
      items: [
        {
          title: 'NextJs',
          href: '#',
          items: [],
        },
      ],
    },
  ],
};
