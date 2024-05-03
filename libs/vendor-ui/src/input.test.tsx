import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input component', () => {
  test('renders correctly with default props', () => {
    render(<Input aria-label="test-input" />);
    const inputElement = screen.getByLabelText('test-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('border-input');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('forwards the ref to the DOM element', () => {
    // eslint-disable-next-line import/no-named-as-default-member -- Disable
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="test-input" />);
    const inputElement = screen.getByLabelText('test-input');
    expect(ref.current).toBe(inputElement);
  });

  test('applies custom styles when provided', () => {
    const customStyle = 'bg-red-500';
    render(<Input customStyle={customStyle} aria-label="test-input" />);
    const inputElement = screen.getByLabelText('test-input');
    expect(inputElement).toHaveClass(customStyle);
  });
});
