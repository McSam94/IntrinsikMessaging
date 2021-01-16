import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import Avatar from '../avatar';

afterEach(cleanup);

test('Render correctly', async (done) => {
  const { getByTestId } = render(
    <Avatar uri="https://robohash.org/est.png?size=300x300" />,
  );

  const avatar = getByTestId('avatar');
  expect(avatar).toBeTruthy();

  done();
});

test('Render selected correctly', async (done) => {
  const { getByTestId } = render(<Avatar isSelected />);

  const selectedAvatar = getByTestId('avatar-selected');
  expect(selectedAvatar).toBeTruthy();

  done();
});

test('Render default correctly', async (done) => {
  const { getByTestId } = render(<Avatar />);

  const defaultAvatar = getByTestId('avatar-default');
  expect(defaultAvatar).toBeTruthy();

  done();
});
