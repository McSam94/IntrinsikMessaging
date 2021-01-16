import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { UpdateThemeProvider } from 'Test/mock-fn';
import { Colors } from 'Styles/colors';
import Icon from '../icon';

afterEach(cleanup);

test('Render correctly', (done) => {
	const mockFn = jest.fn();
	const { getByTestId } = render(
		<Icon name="tick" color={Colors.white} onClick={mockFn} />,
	);

	const iconContainer = getByTestId('icon');
	const svgIcon = getByTestId('icon-tick');
	expect(iconContainer).toBeTruthy();
	expect(svgIcon).toHaveProp('fill', Colors.white);

	fireEvent.press(iconContainer);
	expect(mockFn.mock.calls.length).toBe(1);

	done();
});

test('Render with label correctly', (done) => {
	const mockFn = jest.fn();
	const { getByTestId } = render(
		<UpdateThemeProvider>
			<Icon
				name="tick"
				label="Test"
				color={Colors.primary}
				onClick={mockFn}
			/>
		</UpdateThemeProvider>,
	);
	const darkmodeButton = getByTestId('darkmode-button');

	const iconContainer = getByTestId('icon');
	const svgIcon = getByTestId('icon-tick');
	const iconLabel = getByTestId('icon-label');
	expect(iconContainer).toBeTruthy();
	expect(iconLabel).toHaveStyle({ color: Colors.black });
	expect(svgIcon).toHaveProp('fill', Colors.primary);

	// onClick
	fireEvent.press(iconContainer);
	expect(mockFn.mock.calls.length).toBe(1);

	// darkMode
	fireEvent.press(darkmodeButton);
	expect(iconLabel).toHaveStyle({ color: Colors.white });

	done();
});
