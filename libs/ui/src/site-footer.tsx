import { type SiteSettings } from './site-types';

interface MainHeaderProps {
  siteSettings: SiteSettings;
}

export function SiteFooter({ siteSettings }: MainHeaderProps) {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          Built by Showcase UI, A Neekware Inc. Project.
          {siteSettings.socials.map((sItem) => (
            <a
              key={sItem.title}
              href={sItem.href}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {sItem.title}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
