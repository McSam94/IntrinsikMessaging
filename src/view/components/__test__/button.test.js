import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import { UpdateThemeProvider } from 'Test/mock-fn';
import Button from '../button';
import { Colors } from 'Styles/colors';

afterEach(cleanup);

test('Render correctly', (done) => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <UpdateThemeProvider>
      <Button label="test" onClick={mockFn} />
    </UpdateThemeProvider>,
  );

  const darkmodeButton = getByTestId('darkmode-button');

  const button = getByTestId('button');
  const label = getByTestId('button-label');
  expect(button).toHaveStyle({ backgroundColor: Colors.primary });
  expect(label).toHaveStyle({ color: Colors.white });

  // onClick
  fireEvent.press(button);
  expect(mockFn.mock.calls.length).toBe(1);

  // darkMode
  fireEvent.press(darkmodeButton);
  expect(button).toHaveStyle({ backgroundColor: Colors.primary });
  expect(label).toHaveStyle({ color: Colors.white });

  done();
});

test('Render link correctly', (done) => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <UpdateThemeProvider>
      <Button isLink label="test" onClick={mockFn} />
    </UpdateThemeProvider>,
  );

  const darkmodeButton = getByTestId('darkmode-button');

  const button = getByTestId('button');
  const label = getByTestId('button-label');
  expect(button).toHaveStyle({ backgroundColor: Colors.white });
  expect(label).toHaveStyle({ color: Colors.primary });

  // onClick
  fireEvent.press(button);
  expect(mockFn.mock.calls.length).toBe(1);

  // darkMode
  fireEvent.press(darkmodeButton);
  expect(button).toHaveStyle({ backgroundColor: Colors.black });
  expect(label).toHaveStyle({ color: Colors.primary });

  done();
});
