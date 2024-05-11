import {
  mdiBriefcaseAccountOutline,
  mdiGithub,
  mdiLogout,
  mdiTwitter,
} from '@mdi/js';
import { type SiteSettings } from '@repo/dto';
import { availableThemes } from './themes';

export const siteSettings: SiteSettings = {
  name: 'Showcase UI',
  icon: mdiBriefcaseAccountOutline,
  url: 'https://showcase.io',
  ogImage: 'https://showcase.io/og.jpg',
  description: 'Showcase your political self beautify on a unified portal.',
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
      title: 'Settings',
      href: '/settings',
    },
    {
      title: 'Support',
      href: '/support',
    },
    {
      title: 'Logout',
      href: '/logout',
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
        href: '/contact-us',
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
