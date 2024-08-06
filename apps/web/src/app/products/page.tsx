import Link from 'next/link';
import { authGuard } from '@lib/ui-auth-next';
import { Button } from '@lib/ui-vendor-next';
import { siteSettings } from '@web/cfg';

export const metadata = {
  title: 'Products | Showcase',
};

interface ProductsProps {
  settings?: any;
}

const ProductsPage: React.FC<ProductsProps> = ({ settings }: ProductsProps) => {
  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container !px-1 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Products Showcase UI
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We are a leading provider of innovative solutions for political individuals of all
              levels. Explore our products and services to see how we can help your campaign thrive.
            </p>

            <section id="services">
              <article id="email">
                <h2 className="mt-4 font-bold">Email Campaigns</h2>
                <p>
                  Target potential voters with personalized email messages. Our platform enables
                  segmentation and tracking to optimize engagement.
                </p>
              </article>
              <article id="sms">
                <h2 className="mt-4 font-bold">SMS Outreach</h2>
                <p>
                  Connect instantly with voters via SMS. High open rates ensure your message is
                  seen. Perfect for event reminders and quick updates.
                </p>
              </article>
              <article id="legacy-mail">
                <h2 className="mt-4 font-bold">Legacy Mail Services</h2>
                <p>
                  Maintain traditional appeal with direct mail. Send postcards, flyers, and
                  newsletters to reach voters in a personal way.
                </p>
              </article>
              <article id="forms">
                <h2 className="mt-4 font-bold">Online Forms</h2>
                <p>
                  Gather valuable voter information with custom online forms. Ideal for volunteer
                  sign-ups, surveys, and petitions.
                </p>
              </article>
              <article id="stats">
                <h2 className="mt-4 font-bold">Campaign Analytics</h2>
                <p>
                  Measure the success of your campaigns with our analytics dashboard. Gain insights
                  into voter behavior and campaign performance.
                </p>
              </article>
            </section>
            <div className="flex justify-start gap-4">
              <Link href="/">
                <Button variant="info">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default authGuard(ProductsPage, siteSettings, siteSettings.urls.site.products);
