import crypto from 'crypto-es';

export function signObject<T extends { signature: string }>(obj: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { signature, ...newObj } = obj;
  const hash = crypto.MD5(JSON.stringify(newObj)).toString();

  return { ...obj, signature: hash } as T;
}

export function sanitizeObjectOrString<T extends { signature: string }>(
  input: T | string | undefined
): T | undefined {
  let origObj: T;

  if (typeof input === 'string') {
    try {
      origObj = JSON.parse(input) as T;
    } catch (e) {
      return undefined;
    }
  } else {
    origObj = input ?? ({} as T);
  }

  const testObj = signObject<T>(origObj);
  const result = origObj.signature === testObj.signature ? origObj : undefined;
  return result;
}
