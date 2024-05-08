import React from 'react';
import { Breakpoints } from './breakpoints';

describe('Breakpoints component', () => {
  it('renders without crashing', () => {
    const wrapper = <Breakpoints />;
    expect(wrapper).toBeTruthy();
  });
});
