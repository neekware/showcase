import { type Theme } from './theme';
import { type UrlTypes } from './urls';

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

export interface SiteMetadata {
  name: string;
  icon?: string;
  url: string;
  ogImage: string;
  description: string;
  sessionName: string;
}

export interface SiteSettings extends SiteMetadata {
  urls: UrlTypes;
  themes: Theme[];
  navTopLinks: LinkItem[];
  navOptionLinks: LinkItem[];
  footer: footerInfo;
}
