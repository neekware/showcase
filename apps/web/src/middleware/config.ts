import { siteSettings } from '@web/cfg';

export const { urls: mUrls } = siteSettings;
export const mProtectedPaths = [mUrls.site.admin, mUrls.site.products];
export const authPaths = [mUrls.site.auth.login, mUrls.site.auth.register, mUrls.site.auth.logout];
