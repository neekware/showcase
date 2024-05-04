import { type Icon } from '@mdi/react';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icon;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export type NavMainItem = NavItem;

export type NavSidebarItem = NavItemWithChildren;

export interface MobileSettings {
  navMain: NavMainItem[];
  navSidebar: NavSidebarItem[];
}
