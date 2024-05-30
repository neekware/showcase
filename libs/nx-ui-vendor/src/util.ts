import { cva, type VariantProps } from 'class-variance-authority';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge multiple class names into a single string.
 *
 * @param inputs - The class names to merge.
 * @returns The merged class names as a string.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn, cva, type VariantProps };
