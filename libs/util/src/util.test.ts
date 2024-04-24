import { cn } from './util';

describe('cn function', () => {
  it('should merge multiple class names into one string', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('btn', isActive && 'active', isDisabled && 'disabled')).toBe(
      'btn active'
    );
  });

  it('should handle array of classes', () => {
    expect(cn(['btn', 'btn-primary'], 'active')).toBe('btn btn-primary active');
  });

  it('should handle nested arrays of classes', () => {
    expect(cn(['btn', ['btn-primary', 'active']], 'disabled')).toBe(
      'btn btn-primary active disabled'
    );
  });

  it('should handle objects with boolean values', () => {
    expect(
      cn({
        btn: true,
        'btn-primary': true,
        hidden: false,
      })
    ).toBe('btn btn-primary');
  });
});
