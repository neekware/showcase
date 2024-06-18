import React, { Fragment } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../src/button';

describe('Button component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
    );
  });

  it('renders with custom variant and size', () => {
    render(
      <Button variant="danger" size="lg">
        Click me
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-danger text-danger-foreground hover:bg-danger/90 h-11 rounded-md px-8'
    );
  });

  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
