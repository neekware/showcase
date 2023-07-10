import { ReactNode } from 'react';

/** Rotation component props
 * @typedef {Object} RotateComponentProps
 * @property {ReactNode} children
 * @property {number} [rotationDegrees]
 * @property {number} [rotationDuration]
 * @property {() => void} [onClick]
 */
export interface RotateComponentProps {
  children: ReactNode;
  rotationDegrees?: number;
  rotationDuration?: number;
  onClick?: () => void;
}
