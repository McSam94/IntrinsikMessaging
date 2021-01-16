import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import Header from '../header';

afterEach(cleanup);

test('Render correctly', async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(<Header navigate={mockFn} label="Title" />);

  const navigation = getByTestId('header-navigate');
  const title = getByTestId('header-title');
  expect(navigation).toBeTruthy();
  expect(title.props.children).toEqual('Title');

  fireEvent.press(navigation);

  expect(mockFn.mock.calls.length).toBe(1);
});
