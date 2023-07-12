export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  navItems?: NavItem[];
  links?: {
    twitter?: string;
    github?: string;
    docs?: string;
  };
}
