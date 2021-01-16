import React from 'react';
import { Text } from 'react-native';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { UpdateThemeProvider } from 'Test/mock-fn';
import { Colors } from 'Styles/colors';
import Header from '../header';

afterEach(cleanup);

test('Render correctly', async (done) => {
	const mockFn = jest.fn();
	const { getByTestId } = render(
		<UpdateThemeProvider>
			<Header navigate={mockFn} label="Title">
				<Text testID="test">Test</Text>
			</Header>
		</UpdateThemeProvider>,
	);
	const darkmodeButton = getByTestId('darkmode-button');

	const container = getByTestId('header-container');
	const navigationIcon = getByTestId('header-navigate-icon');
	const navigation = getByTestId('header-navigate');
	const title = getByTestId('header-title');
	const testChild = getByTestId('test');
	expect(navigation).toBeTruthy();
	expect(navigationIcon).toHaveProp('fill', Colors.black);
	expect(title).toHaveTextContent('Title');
	expect(title).toHaveStyle({ color: Colors.black });
	expect(container).toContainElement(testChild);

	// onClick
	fireEvent.press(navigation);
	expect(mockFn.mock.calls.length).toBe(1);

	// darkMode
	fireEvent.press(darkmodeButton);
	expect(navigationIcon).toHaveProp('fill', Colors.white);
	expect(title).toHaveStyle({ color: Colors.white });

	done();
});
