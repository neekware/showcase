import { fireEvent, render } from '@testing-library/react';

import Button from '../button';

test('checks if button click updates the text', () => {
  const handleClick = jest.fn();

  const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);

  // Fire a click event
  fireEvent.click(getByText('Click me'));

  // Expect the handleClick function to have been called once
  expect(handleClick).toHaveBeenCalledTimes(1);
});
