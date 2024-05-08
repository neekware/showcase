export interface LinkItem {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
}

export interface SiteSettings {
  name: string;
  icon?: string;
  url: string;
  ogImage: string;
  description: string;
  navTopLinks: LinkItem[];
  navOptionLinks: LinkItem[];
  footerLinks: LinkItem[];
  footerSocialLinks: LinkItem[];
}
