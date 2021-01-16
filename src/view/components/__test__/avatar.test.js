import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import Avatar from '../avatar';

afterEach(cleanup);

test('Render correctly', async (done) => {
  const { getByTestId } = render(
    <Avatar uri="https://robohash.org/est.png?size=300x300" />,
  );

  const selectedAvatar = getByTestId('avatar');

  expect(selectedAvatar).toBeTruthy();
  done();
});
