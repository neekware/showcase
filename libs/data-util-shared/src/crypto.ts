import { createHash } from 'crypto';

/**
 * Signs an object by generating a hash of its properties (excluding the signature property) and assigning it to the signature property.
 *
 * @typeparam T - The type of the object to sign, which must have a signature property.
 * @param obj - The object to sign.
 * @returns The signed object.
 */
export function sign<T extends { signature: string }>(obj: T): T {
  // eslint-disable-next-line no-unused-vars
  const { signature, ...newObj } = obj;
  const hash = createHash('sha256').update(JSON.stringify(newObj).toString()).digest('hex');

  return { ...obj, signature: hash } as T;
}

/**
 * Verifies the signature of an object or a JSON string.
 *
 * @typeparam T - The type of the object to verify, which must have a signature property.
 * @param input - The object or JSON string to verify.
 * @returns The verified object, or undefined if the verification fails.
 */
export function verify<T extends { signature: string }>(
  input: T | string | undefined
): T | undefined {
  let origObj: T;

  if (typeof input === 'string') {
    try {
      // Try to parse the input string as a JSON object
      origObj = JSON.parse(input) as T;
    } catch (e) {
      // If parsing fails, return undefined
      return undefined;
    }
  } else {
    // If input is not a string, use it as the original object or create an empty object if it's null or undefined
    origObj = input ?? ({} as T);
  }

  // Sign the original object
  const testObj = sign<T>(origObj);
  // Compare the signature of the original object with the signature of the signed object
  const result = origObj.signature === testObj.signature ? origObj : undefined;
  return result;
}
