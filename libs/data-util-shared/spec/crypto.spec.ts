import crypto from 'crypto-js';
import { sign, verify } from '../src/crypto';

interface TestObject {
  data: string;
  signature: string;
}

describe('sign', () => {
  it('should generate a valid signature for the object', () => {
    const obj: TestObject = { data: 'test', signature: '' };
    const signedObj = sign(obj);

    const hash = crypto.MD5(JSON.stringify({ data: 'test' })).toString();
    expect(signedObj.signature).toBe(hash);
  });

  it('should not modify other properties of the object', () => {
    const obj: TestObject = { data: 'test', signature: '' };
    const signedObj = sign(obj);

    expect(signedObj.data).toBe('test');
  });
});

describe('verify', () => {
  it('should verify a valid signed object', () => {
    const obj: TestObject = { data: 'test', signature: '' };
    const signedObj = sign(obj);

    const result = verify(signedObj);
    expect(result).toEqual(signedObj);
  });

  it('should return undefined for an object with an invalid signature', () => {
    const obj: TestObject = { data: 'test', signature: 'invalid' };
    const result = verify(obj);

    expect(result).toBeUndefined();
  });

  it('should verify a valid JSON string representation of an object', () => {
    const obj: TestObject = { data: 'test', signature: '' };
    const signedObj = sign(obj);

    const jsonString = JSON.stringify(signedObj);
    const result = verify(jsonString);

    expect(result).toEqual(signedObj);
  });

  it('should return undefined for a JSON string with an invalid signature', () => {
    const invalidJsonString = '{"data":"test","signature":"invalid"}';
    const result = verify(invalidJsonString);

    expect(result).toBeUndefined();
  });

  it('should return undefined for an invalid JSON string', () => {
    const invalidJsonString = '{"data":"test", "signature":"invalid"';
    const result = verify(invalidJsonString);

    expect(result).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    const result = verify(undefined);

    expect(result).toBeUndefined();
  });
});
