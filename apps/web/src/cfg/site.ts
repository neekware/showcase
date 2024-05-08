import {
  mdiBriefcaseAccountOutline,
  mdiGithub,
  mdiLogout,
  mdiTwitter,
} from '@mdi/js';
import { type SiteSettings } from '@repo/dto';

export const siteSettings: SiteSettings = {
  name: 'Showcase UI',
  icon: mdiBriefcaseAccountOutline,
  url: 'https://showcase.io',
  ogImage: 'https://showcase.io/og.jpg',
  description: 'Showcase your political self beautify on a unified portal.',
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
  footerLinks: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  footerSocialLinks: [
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
};
