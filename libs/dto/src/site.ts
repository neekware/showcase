import { Theme } from './theme';

export interface LinkItem {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
}

export interface footerInfo {
  product: LinkItem[];
  resources: LinkItem[];
  company: LinkItem[];
  social: LinkItem[];
}

export interface SiteSettings {
  name: string;
  icon?: string;
  url: string;
  ogImage: string;
  description: string;
  themes: Theme[];
  navTopLinks: LinkItem[];
  navOptionLinks: LinkItem[];
  footer: footerInfo;
}
