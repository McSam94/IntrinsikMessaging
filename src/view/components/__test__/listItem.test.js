import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ListItem from '../listItem';
import Icon from '../icon';

afterEach(cleanup);

test('Render correctly', async () => {
	const mockFn = jest.fn();
	const { getByTestId } = render(
		<ListItem
			icon={<Icon name="tick" />}
			title="Title"
			description="Description"
			onClick={mockFn}
		/>,
	);

	const listItem = getByTestId('listitem');
	const title = getByTestId('listitem-title');
	const description = getByTestId('listitem-description');

	expect(title).toHaveTextContent('Title');
	expect(description).toHaveTextContent('Description');

	fireEvent.press(listItem);

	expect(mockFn.mock.calls.length).toBe(1);
});
