import { tg } from '../src/tryget';

describe('tg', () => {
  it('should return the nested property value when it exists', () => {
    const obj = { a: { b: { c: { name: 'test' } } } };
    const result = tg(() => obj.a.b.c.name, 'fallback');
    expect(result).toBe('test');
  });

  it('should return the fallback value when the property is undefined', () => {
    const obj = { a: { b: {} } };
    // @ts-ignore
    const result = tg(() => obj.a.b.c, 'fallback');
    expect(result).toBe('fallback');
  });

  it('should return the fallback value when there is a TypeError', () => {
    const obj = {};
    // @ts-ignore
    const result = tg(() => obj.a.b.c, 'fallback');
    expect(result).toBe('fallback');
  });

  it('should re-throw errors that are not TypeErrors', () => {
    const obj = {
      get a() {
        throw new Error('Unexpected error');
      },
    };
    // @ts-ignore
    expect(() => tg(() => obj.a.b.c, 'fallback')).toThrow('Unexpected error');
  });

  it('should return null as the fallback if not provided', () => {
    const obj = { a: { b: {} } };
    // @ts-ignore
    const result = tg(() => obj.a.b.c);
    expect(result).toBeNull();
  });

  it('should return the correct fallback for non-null falsy values', () => {
    const obj = { a: { b: { c: { name: '' } } } };
    const result = tg(() => obj.a.b.c.name, 'fallback');
    expect(result).toBe('');
  });
});
