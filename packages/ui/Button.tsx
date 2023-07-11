'use client';

import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="p-10" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
