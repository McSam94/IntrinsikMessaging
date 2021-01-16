import React from 'react';
import { cleanup, render, fireEvent, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { UpdateThemeProvider } from 'Test/mock-fn';
import { Colors } from 'Styles/colors';
import Input from '../input';
import CONSTANT from 'Styles/constant';

afterEach(cleanup);

test('Render correctly', async () => {
	jest.useFakeTimers('legacy');
	const { getByTestId } = render(
		<UpdateThemeProvider>
			<Input label="Test" shouldAnimate />
		</UpdateThemeProvider>,
	);
	const darkmodeButton = getByTestId('darkmode-button');

	const inputContainer = getByTestId('input');
	const inputLabel = getByTestId('input-label');
	const inputField = getByTestId('input-field');

	expect(inputContainer).not.toHaveStyle({ borderBottomWidth: 1 });
	expect(inputLabel).toHaveStyle({
		color: Colors.gray,
		backgroundColor: 'transparent',
		fontSize: 15,
		top: CONSTANT.INPUT.HEIGHT / 3,
	});
	expect(inputField).toHaveStyle({ color: Colors.black });

	// onFocus
	fireEvent(inputField, 'focus');
	global.timeTravel(CONSTANT.INPUT.ANIMATION_DURATION);
	expect(inputLabel).toHaveStyle({
		color: Colors.primary,
		backgroundColor: Colors.white,
		fontSize: 13,
		top: (CONSTANT.INPUT.HEIGHT / 6) * -1,
	});

	// darkMode
	fireEvent.press(darkmodeButton);
	expect(inputLabel).toHaveStyle({
		backgroundColor: Colors.black,
	});
	expect(inputField).toHaveStyle({
		color: Colors.white,
	});

	fireEvent(inputField, 'blur');
	global.timeTravel(CONSTANT.INPUT.ANIMATION_DURATION);
	expect(inputLabel).toHaveStyle({
		color: Colors.light,
		backgroundColor: 'transparent',
	});
}, 30000);

test('Render with underline correctly', (done) => {
	const { getByTestId } = render(
		<UpdateThemeProvider>
			<Input underline label="Test" shouldAnimate />
		</UpdateThemeProvider>,
	);
	const darkmodeButton = getByTestId('darkmode-button');

	const inputContainer = getByTestId('input');
	const inputLabel = getByTestId('input-label');
	const inputField = getByTestId('input-field');

	expect(inputContainer).toHaveStyle({
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray,
	});
	expect(inputLabel).toHaveStyle({
		color: Colors.gray,
		backgroundColor: 'transparent',
		fontSize: 15,
		top: CONSTANT.INPUT.HEIGHT / 3,
	});
	expect(inputField).toHaveStyle({ color: Colors.black });

	// onClick
	fireEvent(inputField, 'focus');
	global.timeTravel(CONSTANT.INPUT.ANIMATION_DURATION);
	expect(inputContainer).toHaveStyle({
		borderBottomColor: Colors.primary,
	});
	expect(inputLabel).toHaveStyle({
		color: Colors.primary,
		backgroundColor: Colors.white,
		fontSize: 13,
		top: (CONSTANT.INPUT.HEIGHT / 6) * -1,
	});

	// darkMode
	fireEvent.press(darkmodeButton);
	expect(inputLabel).toHaveStyle({
		backgroundColor: Colors.black,
	});
	expect(inputField).toHaveStyle({
		color: Colors.white,
	});

	fireEvent(inputField, 'blur');
	global.timeTravel(CONSTANT.INPUT.ANIMATION_DURATION);
	expect(inputContainer).toHaveStyle({
		borderBottomColor: Colors.light,
	});
	expect(inputLabel).toHaveStyle({
		color: Colors.light,
		backgroundColor: 'transparent',
	});

	done();
});
