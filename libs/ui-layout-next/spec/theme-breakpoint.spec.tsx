import React from 'react';
import { Breakpoints } from '../src/theme-breakpoints';

describe('Breakpoints component', () => {
  it('renders without crashing', () => {
    const wrapper = <Breakpoints />;
    expect(wrapper).toBeTruthy();
  });
});
