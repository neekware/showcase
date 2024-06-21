import { interpolate } from '../src/interpolate';

describe('renderTemplate', () => {
  it('should render a template with arguments', () => {
    const template = 'Hello, {{name}}! You are {{age}} years old.';
    const args = { name: 'Alice', age: 30 };

    const result = interpolate(template, args);

    expect(result).toBe('Hello, Alice! You are 30 years old.');
  });

  it('should render with trim on', () => {
    const template = 'Hello, {{name}}!   ';
    const args = { name: 'Alice' };

    const result = interpolate(template, args);

    expect(result).toBe('Hello, Alice!');
  });

  it('should render with trim off', () => {
    const template = 'Hello, {{name}}!   ';
    const args = { name: 'Alice' };

    const result = interpolate(template, args, { trim: false });

    expect(result).toBe('Hello, Alice!   ');
  });

  it('should render with single space on', () => {
    const template = 'Hello,    {{name}}!';
    const args = { name: 'Alice' };

    const result = interpolate(template, args, { singleSpace: true });

    expect(result).toBe('Hello, Alice!');
  });

  it('should render with single space off', () => {
    const template = 'Hello,    {{name}}!';
    const args = { name: 'Alice' };

    const result = interpolate(template, args);

    expect(result).toBe('Hello,    Alice!');
  });

  it('should render with single space on and trim on', () => {
    const template = 'Hello,    {{name}}!    ';
    const args = { name: 'Alice' };

    const result = interpolate(template, args, { singleSpace: true });

    expect(result).toBe('Hello, Alice!');
  });
});
