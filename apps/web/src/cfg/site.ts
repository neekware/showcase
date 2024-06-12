import { type SiteSettings } from '@lib/data-model-shared';
import { mdiCog, mdiGithub, mdiLogin, mdiLogout, mdiTwitter, mdiWrench } from '@lib/ui-icon-next';
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
        href: '/products',
      },
      {
        title: 'Email',
        href: '/products',
      },
      {
        title: 'SMS',
        href: '/products',
      },
      {
        title: 'Legacy Mail',
        href: '/products',
      },
      {
        title: 'Driving Assist',
        href: '/products',
      },
      {
        title: 'Sign Up',
        href: '/auth/login',
      },
    ],
    resources: [
      {
        title: 'Docs',
        href: '/products',
      },
      {
        title: 'Export',
        href: '/products',
      },
      {
        title: 'Pricing',
        href: '/products',
      },
      {
        title: 'Guides',
        href: '/products',
      },
    ],
    company: [
      {
        title: 'About',
        href: '/products',
      },
      {
        title: 'Blog',
        href: '/products',
      },
      {
        title: 'Careers',
        href: '/products',
      },
      {
        title: 'Contact Us',
        href: '/products',
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
