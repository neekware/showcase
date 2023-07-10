import React, { useState } from 'react';

import { tm } from '../../util/style/styleUtil';
import { RotateComponentProps } from './types';

/**
 * Rotate the children when clicked, then swap the hidden vs. visible child.
 * @param children The children to render
 * @param rotationDegrees  The degrees to rotate the children
 * @param rotationDuration  The duration of the rotation in seconds
 * @param onClick  The callback to call when the children is clicked
 * @returns
 */
export const RotateSwapComponent: React.FC<RotateComponentProps> = ({
  children,
  rotationDegrees = 180,
  rotationDuration = 0.6,
  onClick,
}) => {
  const [rotation, setRotation] = useState(0);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  const handleClick = () => {
    const newRotation = rotation === 0 ? rotationDegrees : 0;
    setRotation(newRotation);

    // Swap the child
    setCurrentChildIndex((currentChildIndex + 1) % 2);

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
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={tm({ hidden: index !== currentChildIndex })}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
