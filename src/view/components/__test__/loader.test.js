import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import Loader from '../loader';

afterEach(cleanup);

test('Render correctly', async () => {
	const { getByTestId } = render(<Loader message="Loading" />);

	const loader = getByTestId('loader');

	expect(loader).toHaveTextContent('Loading');
});
