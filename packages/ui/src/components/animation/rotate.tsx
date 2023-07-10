import React, { useState } from 'react';

import { RotateComponentProps } from './types';

/**
 * Rotate the children when clicked.
 * @param children The children to render
 * @param rotationDegrees  The degrees to rotate the children
 * @param rotationDuration  The duration of the rotation in seconds
 * @param onClick  The callback to call when the children is clicked
 * @returns
 */
export const RotateComponent: React.FC<RotateComponentProps> = ({
  children,
  rotationDegrees = 180,
  rotationDuration = 0.6,
  onClick,
}) => {
  const [rotation, setRotation] = useState<number>(0);

  const handleClick = () => {
    const newRotation = rotation === 0 ? rotationDegrees : 0;
    setRotation(newRotation);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        transition: `transform ${rotationDuration}s`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
      }}
    >
      {children}
    </div>
  );
};
