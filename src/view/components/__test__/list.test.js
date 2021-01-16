import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import List from '../list';
import { Text } from 'react-native';

afterEach(cleanup);

test('Render empty correctly', async () => {
	const { getByTestId } = render(
		<List
			data={[]}
			renderItem={({ item }) => <Text>{item}</Text>}
			emptyMsg={'Empty'}
		/>,
	);

	const image = getByTestId('list-image-icon-emptyStatus');
	const message = getByTestId('list-message');

	expect(image).toBeTruthy();
	expect(message).toHaveTextContent('Empty');
});

test('Render error correctly', async () => {
	const { getByTestId } = render(<List data={[]} error={'Error'} />);

	const image = getByTestId('list-image-icon-errorStatus');
	const message = getByTestId('list-message');

	expect(image).toBeTruthy();
	expect(message).toHaveTextContent('Error');
});
