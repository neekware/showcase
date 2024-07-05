import React, { useEffect } from 'react';

interface RedirectComponentProps {
  redirect: string;
  go: boolean;
}

export const RedirectComponent = ({ redirect, go }: RedirectComponentProps) => {
  useEffect(() => {
    if (go && redirect) {
      window.location.href = redirect;
    }
  }, [go, redirect]);

  return null;
};
