import crypto from 'crypto-es';

export function signObject<T extends { signature: string }>(obj: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { signature, ...newObj } = obj;
  const hash = crypto.MD5(JSON.stringify(newObj)).toString();

  return { ...obj, signature: hash } as T;
}

export function sanitizeObjectOrString<T extends { signature: string }>(
  obj: T | string,
  defaultObj: T | boolean | undefined
): T | boolean {
  let origObj: T;

  if (typeof obj === 'string') {
    try {
      origObj = JSON.parse(obj) as T;
    } catch (e) {
      return false;
    }
  } else {
    origObj = obj;
  }

  const testObj = signObject<T>(origObj);
  return origObj.signature === testObj.signature
    ? origObj
    : defaultObj ?? false;
}
