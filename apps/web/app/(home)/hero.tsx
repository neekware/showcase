import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { BlobsAnimation, RadialGradient } from '@showcase/components';
import { CirclePulse, Heartbeat, LogoCPC } from '@showcase/svgs';
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
          <div className="relative">
            <RadialGradient
              className="-left-[208px] top-[130px] md:-left-[136px] md:-top-[130px]"
              stopColor1="#18B4F4"
              stopColor2="#2E3772"
            />
          </div>
          <div className="relative">
            <RadialGradient
              className="-left-[874px] -top-[390px] md:-left-[1171px] md:-top-[390px]"
              stopColor1="#AC7FF4"
              stopColor2="#151934"
            />
          </div>

          {/* <BlobsAnimation
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
          /> */}
          {/* <div className="relative">
            <div className="fixed -right-[400px] top-[100px] h-[800px] w-[1400px]">
              <svg
                width="1440"
                height="1234"
                viewBox="0 0 1440 1234"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="768"
                  cy="617"
                  rx="1118"
                  ry="617"
                  fill="url(#paint0_radial_2320_2533)"
                  fill-opacity="0.3"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_2320_2533"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(768 617) rotate(90) scale(400 800)"
                  >
                    <stop stop-color="#AC7FF4" />
                    <stop offset="1" stop-color="#151934" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            <div className="fixed -left-[200px] top-[600px] h-[1200px] w-[1400px]">
              <svg
                width="1252"
                height="1756"
                viewBox="0 0 1252 1756"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="1053.9"
                  cy="877.9"
                  rx="1054.64"
                  ry="876.144"
                  transform="rotate(-4.48315 1053.9 877.9)"
                  fill="url(#paint0_radial_2038_2502)"
                  fill-opacity="0.4"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_2038_2502"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(800 745.025) rotate(88.5492) scale(1009.34 1215.3)"
                  >
                    <stop stop-color="#18B4F4" />
                    <stop
                      offset="0.632219"
                      stop-color="#2E3772"
                      stop-opacity="0"
                    />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div> */}
          {/* <div
            className="gradients_glow gradients_glowConic gradients_glowSmall absolute z-50 flex h-64 w-64 items-center justify-center opacity-40 dark:opacity-100"
            style={{ width: '120px', height: '120px', borderRadius: '100%' }}
          ></div> */}

          <CirclePulse
            strokeOpacity={'.12'}
            strokeWidth={'.05'}
            className="md:h-[36rem] md:w-[36rem]"
          />
          {/* <LogoCPC heartBeat={true} width={160} height={160} /> */}
          {/* <Heartbeat /> */}
          <div style={{ height: '300px', width: '300px' }}>
            <img src="/icons/svg/flag.svg" alt="Heartbeat" />
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
