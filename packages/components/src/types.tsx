import type { Icon } from './icons';

export type CssPosition =
  | 'relative'
  | 'absolute'
  | 'fixed'
  | 'static'
  | 'sticky';

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
  leftNavItems?: NavItem[];
  partyColorDark?: string;
  partyColorLight?: string;
};

export type Icons = {
  [key: string]: Icon;
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
} & (
  | {
      href: string;
    }
  | {
      items: SidebarNavItem[];
    }
);
