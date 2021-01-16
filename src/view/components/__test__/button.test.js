import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import Button from '../button';

afterEach(cleanup);

test('Render correctly', async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<Button label="test" onClick={mockFn} />);

  const button = getByTestId('button');
  expect(button).toBeTruthy();

  fireEvent.press(button);

  expect(mockFn.mock.calls.length).toBe(1);
});
