import { randomUUID } from 'crypto';

import React from 'react';

type Position = 'relative' | 'absolute' | 'fixed' | 'static' | 'sticky';

interface RadialGradientProps {
  width?: string;
  height?: string;
  viewBox?: string;
  cx?: string;
  cy?: string;
  rx?: string;
  ry?: string;
  gradientTransform?: string;
  stopColor1?: string;
  stopColor2?: string;
  stopOpacity2?: string;
  fillOpacity?: string;
  position?: Position;
  className?: string;
}

export const RadialGradient: React.FC<RadialGradientProps> = ({
  width = '1440',
  height = '821',
  viewBox = '0 0 1440 821',
  cx = '657.051',
  cy = '410.5',
  rx = '842.051',
  ry = '410.5',
  gradientTransform = 'translate(657.051 410.5) rotate(90) scale(410.5 700.051)',
  stopColor1 = '#AC7FF4',
  stopColor2 = '#151934',
  stopOpacity2 = '0',
  fillOpacity = '0.6',
  position = 'absolute',
  className = '',
}) => {
  // Generate a unique ID for each instance to avoid conflicts when using multiple gradients on the same page
  const gradientId = randomUUID();

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={position ? { position: position } : {}}
    >
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={`url(#${gradientId})`}
        fillOpacity={fillOpacity}
      />
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={gradientTransform}
        >
          <stop offset="0" stopColor={stopColor1} />
          <stop offset="1" stopColor={stopColor2} stopOpacity={stopOpacity2} />
        </radialGradient>
      </defs>
    </svg>
  );
};
