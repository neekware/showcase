import * as React from 'react';

import Image from 'next/image';

export function Hero() {
  return (
    <>
      <div
        className="z-50 flex w-full items-center justify-center"
        style={{ opacity: 1, transform: 'none' }}
      >
        <div className="absolute min-h-[614px] min-w-[614px]">
          <Image
            alt="Hero"
            loading="lazy"
            width="614"
            height="614"
            decoding="async"
            className="hidden dark:block"
            style={{ color: 'transparent' }}
            src="icons/svg/dark-hero-circles.svg"
          />
          <Image
            alt="Hero"
            loading="lazy"
            width="614"
            height="614"
            decoding="async"
            className="block dark:hidden"
            style={{ color: 'transparent' }}
            src="icons/svg/light-hero-circles.svg"
          />
        </div>
        <div className="absolute z-50 flex h-64 w-64 items-center justify-center">
          <span
            className="gradients_glow gradients_glowConic gradients_glowSmall absolute opacity-40 dark:opacity-100"
            style={{ width: '120px', height: '120px', borderRadius: '100%' }}
          ></span>
        </div>
        <div className="z-50 h-[120px] w-[120px]">
          <Image
            alt=""
            loading="lazy"
            width="120"
            height="120"
            decoding="async"
            className="hidden dark:block"
            style={{ color: 'transparent' }}
            src="/logos/cpc/cpc-logo-light.png"
          />
          <Image
            alt=""
            loading="lazy"
            width="120"
            height="120"
            decoding="async"
            className="block dark:hidden"
            style={{ color: 'transparent' }}
            src="/logos/cpc/cpc-logo-dark.png"
          />
        </div>
      </div>
    </>
  );
}
