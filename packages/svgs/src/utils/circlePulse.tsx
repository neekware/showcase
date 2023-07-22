import React from 'react';

interface CirclePulseProps {
  width?: string;
  height?: string;
  viewBox?: string;
  stopColorLight?: string;
  stopColorDark?: string;
  stopOpacity?: string;
  strokeOpacity?: string;
  strokeWidth?: string;
  circleRadii?: number[];
  animationDurations?: string[];
  animationBegins?: string[];
  theme?: 'light' | 'dark';
  className?: string;
}

export const CirclePulse: React.FC<CirclePulseProps> = ({
  width = '614',
  height = '614',
  viewBox = '0 0 100 100',
  stopColorLight = '#fff',
  stopColorDark = '#000',
  stopOpacity = '0',
  strokeOpacity = '.1',
  strokeWidth = '.1',
  circleRadii = [25, 25, 45],
  animationDurations = ['3s', '3s', '3s'],
  animationBegins = ['0.2s', '0s', '0.4s'],
  theme = 'light',
  className = '',
}) => {
  const stopColor = theme === 'dark' ? stopColorDark : stopColorLight;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="Layer_1"
      viewBox={viewBox}
      width={width}
      height={height}
    >
      <defs>
        <radialGradient id="radial" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={stopColor} />
          <stop offset="60%" stopColor={stopColor} stopOpacity={stopOpacity} />
        </radialGradient>
      </defs>
      {circleRadii.map((radius, index) => (
        <circle
          key={index}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          style={{
            fill: index === 1 ? 'url(#radial)' : 'none',
            fillOpacity: '.0',
            stroke: `rgba(255,255,255,${strokeOpacity})`,
          }}
        >
          <animate
            attributeName="opacity"
            values="1;0.5;0.5;1"
            dur={animationDurations[index]}
            begin={animationBegins[index]}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};
