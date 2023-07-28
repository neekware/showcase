import * as React from 'react';

import Link from 'next/link';

import { BlobsAnimation, RadialGradient } from '@showcase/components';
import { CirclePulse, LogoCPC } from '@showcase/svgs';
import { Button, buttonVariants } from '@showcase/ui';
import { cn } from '@showcase/utils';

import { siteConfig } from '../../environment/settings';

export function Hero() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div
          className="z-50 flex w-full items-center justify-center"
          style={{ opacity: 1, transform: 'none' }}
        >
          <CirclePulse
            strokeOpacity={'.12'}
            strokeWidth={'.05'}
            className="fixed md:h-[36rem] md:w-[36rem]"
          />
          <BlobsAnimation
            className="pointer-events-none flex items-center justify-center"
            blobs={[
              {
                color: 'bg-blue-300',
              },
              {
                color: 'bg-yellow-300',
              },
              {
                color: 'bg-purple-500',
              },
            ]}
          />

          {/* <RadialGradient
            startColor="rgba(24, 180, 244, 0.5)"
            endColor="rgba(46, 55, 114, 0)"
            position={{
              top: '100px',
              right: '-400px',
              width: '1400px',
              height: '800px',
              rotation: '5deg',
            }}
          /> */}

          {/* <div
            className="gradients_glow gradients_glowConic gradients_glowSmall absolute z-50 flex h-64 w-64 items-center justify-center opacity-40 dark:opacity-100"
            style={{ width: '120px', height: '120px', borderRadius: '100%' }}
          ></div> */}

          <div className="z-50">
            <LogoCPC heartBeat={true} width={160} height={160} />
          </div>
        </div>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 pt-10 text-center">
          <div className="rounded-2xl px-4 py-1.5 text-2xl font-semibold ">
            <div style={{ color: siteConfig.partyColorDark }}>
              Conservative Association
            </div>
            <div className="text-muted-foreground">Waterloo CPC</div>
          </div>

          <h1 className="gradients_heroHeading max-w-lg text-center text-[40px] font-extrabold leading-none tracking-[-0.04em] text-transparent md:max-w-xl md:text-5xl lg:max-w-4xl lg:text-[80px]">
            Let&apos;s bring home common sense!{' '}
          </h1>

          <p className="text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
            A balance between fiscal accountability, progressive social policy
            and individual rights and responsibilities;
          </p>
          <div className="space-x-4">
            <Button variant="error" size="lg">
              Hello
            </Button>
            <Link href="/donate" className={cn(buttonVariants({ size: 'lg' }))}>
              Donate
            </Link>
            <Link
              href={siteConfig.links.github}
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'error', size: 'lg' }))}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
