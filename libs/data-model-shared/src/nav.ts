export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string | unknown;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export type TopNavItem = NavItem;

export type NavSidebarItem = NavItemWithChildren;

export interface MobileSettings {
  topNav: TopNavItem[];
  navSidebar: NavSidebarItem[];
}
