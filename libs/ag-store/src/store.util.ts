import { ObjectType } from '@repo/ag-dto';

/**
 * Returns true if the input is a function.
 *
 * @param value - The value to check.
 * @returns True if the input is a function, false otherwise.
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * Simple Object DeepFreeze implementation.
 *
 * @param obj - The object to freeze.
 * @returns The frozen object.
 */
export function deepFreeze<T extends ObjectType>(obj: ObjectType): T {
  Object.freeze(obj);
  const oIsFunction = isFunction(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (
      Object.prototype.hasOwnProperty.call(obj, prop) &&
      (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) &&
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop] as { [key: string]: unknown });
    }
  });

  return obj as T;
}
