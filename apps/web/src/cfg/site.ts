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
      title: 'Home',
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
      title: 'Settings',
      href: '/settings',
      icon: mdiCog,
    },
    {
      title: 'Support',
      href: '/support',
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
        href: '/product/web',
      },
      {
        title: 'Email',
        href: '/product/email',
      },
      {
        title: 'SMS',
        href: '/product/sms',
      },
      {
        title: 'Legacy Mail',
        href: '/product/mail',
      },
      {
        title: 'Driving Assist',
        href: '/product/drive-assist',
      },
      {
        title: 'Sign Up Forms',
        href: '/product/forms',
      },
    ],
    resources: [
      {
        title: 'Docs',
        href: '/docs',
      },
      {
        title: 'Export',
        href: '/expert',
      },
      {
        title: 'Pricing',
        href: '/pricing',
      },
      {
        title: 'Guides',
        href: '/guides',
      },
    ],
    company: [
      {
        title: 'About',
        href: '/about',
      },
      {
        title: 'Blog',
        href: '/blog',
      },
      {
        title: 'Careers',
        href: '/careers',
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
