import { type SiteSettings } from '@lib/data-model-shared';
import { mdiCog, mdiGithub, mdiLogin, mdiLogout, mdiTwitter, mdiWrench } from '@lib/ui-icon-next';
import { availableThemes } from './theme';
import { urls } from './urls';

export const metaSettings = {
  appVersion: '0.0.0',
  name: 'Showcase UI',
  icon: '/images/phoenix.svg',
  url: 'https://showcase.io',
  ogImage: 'https://showcase.io/og.jpg',
  description: 'Showcase your political self beautify on a unified portal.',
};

export const siteSettings: SiteSettings = {
  urls,
  ...metaSettings,
  themes: availableThemes,
  navTopLinks: [
    {
      title: 'Home',
      href: urls.site.home,
    },
    {
      title: 'About',
      href: urls.site.about,
    },
    {
      title: 'Products',
      href: urls.site.products,
    },
  ],
  navOptionLinks: [
    {
      title: 'Login',
      href: urls.site.auth.login,
      icon: mdiLogin,
    },
    {
      title: 'More',
      href: urls.site.more,
      icon: mdiCog,
    },
    {
      title: 'Dashboard',
      href: urls.site.dash,
      icon: mdiWrench,
    },

    {
      title: 'Logout',
      href: urls.site.auth.logout,
      icon: mdiLogout,
    },
  ],
  footer: {
    product: [
      {
        title: 'Web UI',
        href: urls.site.products,
      },
      {
        title: 'Email',
        href: urls.site.products,
      },
      {
        title: 'SMS',
        href: urls.site.products,
      },
      {
        title: 'Legacy Mail',
        href: urls.site.products,
      },
      {
        title: 'Driving Assist',
        href: urls.site.products,
      },
      {
        title: 'Sign Up',
        href: urls.site.auth.register,
      },
    ],
    resources: [
      {
        title: 'Docs',
        href: urls.site.products,
      },
      {
        title: 'Export',
        href: urls.site.products,
      },
      {
        title: 'Pricing',
        href: urls.site.products,
      },
      {
        title: 'Guides',
        href: urls.site.products,
      },
    ],
    company: [
      {
        title: 'About',
        href: urls.site.products,
      },
      {
        title: 'Blog',
        href: urls.site.products,
      },
      {
        title: 'Careers',
        href: urls.site.products,
      },
      {
        title: 'Contact Us',
        href: urls.site.products,
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
