import { mdiCog, mdiGithub, mdiLogin, mdiLogout, mdiTwitter, mdiWrench } from '@mdi/js';
import { type SiteSettings } from '@repo/ag-dto';
import { availableThemes } from './theme';

export const metaSettings = {
  appVersion: '0.0.0',
  name: 'Showcase UI',
  icon: '/images/phoenix.svg',
  url: 'https://showcase.io',
  ogImage: 'https://showcase.io/og.jpg',
  description: 'Showcase your political self beautify on a unified portal.',
};

export const siteSettings: SiteSettings = {
  ...metaSettings,
  themes: availableThemes,
  navTopLinks: [
    {
      title: 'Home 3',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Products',
      href: '/products',
    },
  ],
  navOptionLinks: [
    {
      title: 'Login',
      href: '/auth/login',
      icon: mdiLogin,
    },
    {
      title: 'More',
      href: '/more',
      icon: mdiCog,
    },
    {
      title: 'Dashboard',
      href: '/dash',
      icon: mdiWrench,
    },

    {
      title: 'Logout',
      href: '/auth/logout',
      icon: mdiLogout,
    },
  ],
  footer: {
    product: [
      {
        title: 'Web UI',
        href: '/product',
      },
      {
        title: 'Email',
        href: '/product',
      },
      {
        title: 'SMS',
        href: '/product',
      },
      {
        title: 'Legacy Mail',
        href: '/product',
      },
      {
        title: 'Driving Assist',
        href: '/product',
      },
      {
        title: 'Sign Up',
        href: '/auth/login',
      },
    ],
    resources: [
      {
        title: 'Docs',
        href: '/more',
      },
      {
        title: 'Export',
        href: '/more',
      },
      {
        title: 'Pricing',
        href: '/more',
      },
      {
        title: 'Guides',
        href: '/more',
      },
    ],
    company: [
      {
        title: 'About',
        href: '/about',
      },
      {
        title: 'Blog',
        href: '/more',
      },
      {
        title: 'Careers',
        href: '/more',
      },
      {
        title: 'Contact Us',
        href: '/contact',
      },
    ],
    social: [
      {
        title: 'X',
        href: 'https://twitter.com/',
        icon: mdiTwitter,
      },
      {
        title: 'GitHub',
        href: 'https://github.com/neekware',
        icon: mdiGithub,
      },
    ],
  },
};
