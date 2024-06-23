import { type UrlTypes } from '@lib/data-model-shared';

// Site-wide URLs, api and pages
export const urls: UrlTypes = {
  api: {
    ping: '/api/ping',
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      refresh: '/api/auth/refresh',
      logout: '/api/auth/logout',
    },
  },
  site: {
    home: '/',
    about: '/about',
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
    },
    more: '/more',
    dash: '/dash',
    products: '/products',
  },
};
