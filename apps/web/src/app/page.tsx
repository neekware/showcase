'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslate } from '@lib/data-i18n-shared';
import { Button } from '@lib/ui-vendor-next';
import { siteSettings } from '@web/cfg';

const { urls } = siteSettings;

export default function Home() {
  const t = useTranslate();
  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      <section className="py-1 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-left">
            <div className="flex items-center justify-center">
              {siteSettings.icon ? (
                <div className="w-120 sm:w-160 md:w-200 lg:w-200 relative">
                  <Image
                    priority
                    src={siteSettings.icon}
                    layout="responsive"
                    width={200}
                    height={200}
                    alt="Showcase UI"
                  />
                </div>
              ) : null}

              <h1 className="flex flex-col items-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <div>{t('welcome', 'common')}</div>
                <div>Showcase</div>
                <div>UI</div>
              </h1>

              {siteSettings.icon ? (
                <div className="w-120 sm:w-160 md:w-200 lg:w-200 relative -scale-x-100">
                  <Image
                    priority
                    src={siteSettings.icon}
                    layout="responsive"
                    width={200}
                    height={200}
                    alt="Showcase UI"
                  />
                </div>
              ) : null}
            </div>

            <p className="text-justify text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We are a leading provider of innovative solutions for political individuals at all
              levels. Our platform allows aspiring candidates to showcase themselves effectively
              through personalized campaign pages that highlight their background, achievements, and
              campaign goals. We offer fundraising tools to manage online donations, track progress
              with real-time analytics, and engage voters with personalized messages, updates,
              virtual town halls, and live Q&A sessions. Additionally, we provide volunteer
              management tools, media and public relations support, data analytics to tailor
              campaign strategies, event management, issue advocacy sections, and access to training
              and support from campaign experts.
            </p>
            <p className="text-justify text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Join us to leverage cutting-edge technology to connect with voters, mobilize support,
              and secure your victory. Our comprehensive suite of products and services, including
              social media integration, centralized volunteer dashboards, media training, predictive
              modeling, integrated scheduling tools, detailed policy proposals, and online courses,
              ensures that your campaign will thrive. Let’s build a stronger future together.
            </p>
            <div className="mx-auto flex w-full items-center justify-center gap-6 pt-8 sm:w-auto md:w-auto lg:w-auto">
              <Link href={urls.site.auth.login}>
                <Button variant="default" className="w-20 sm:w-32 md:w-48 lg:w-64">
                  Login
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="danger" className="w-20 sm:w-32 md:w-48 lg:w-64">
                  Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
