import type { Icon } from './icons';

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
