interface GradientProps {
  className?: string;
  startColor?: string;
  endColor?: string;
  position?: {
    top?: string;
    right?: string;
    width?: string;
    height?: string;
    rotation?: string;
  };
  role?: string;
}

export const RadialGradient: React.FC<GradientProps> = ({
  className = 'purple-gradient',
  startColor = 'rgba(24, 180, 244, 0.5)',
  endColor = 'rgba(46, 55, 114, 0)',
  position = {
    top: '100px',
    right: '-400px',
    width: '1400px',
    height: '800px',
    rotation: '5deg',
  },
  role = 'presentation',
}) => {
  const { top, right, width, height, rotation } = position;
  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        width,
        height,
        top,
        right,
        background: `radial-gradient(57.58% 57.58% at 48.79% 42.42%, ${startColor} 0%, ${endColor} 63.22%)`,
        transform: `rotate(${rotation})`,
      }}
      role={role}
    />
  );
};
