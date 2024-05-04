export interface SocialItem {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: string;
  label?: string;
}

export interface SiteSettings {
  name: string;
  url: string;
  ogImage: string;
  description: string;
  socials: SocialItem[];
}
