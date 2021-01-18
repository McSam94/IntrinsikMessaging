import React from 'react';
import { cleanup, render, fireEvent, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { TestSafeAreaProvider } from 'Test/mock-fn';
import { Providers } from 'Stores';
import Login from '../login';

afterEach(cleanup);

test('Should not trigger error', async () => {
	const { getByTestId, queryByTestId } = render(
		<TestSafeAreaProvider>
			<Providers>
				<Login />
			</Providers>
		</TestSafeAreaProvider>,
	);

	const usernameInput = getByTestId('login-username-input');
	const passwordInput = getByTestId('login-password-input');
	const submitButton = getByTestId('login-submit-button');

	await act(async () => {
		fireEvent.changeText(usernameInput, 'username');
		fireEvent.changeText(passwordInput, '123456');
		fireEvent.press(submitButton);
	});
	const usernameError = queryByTestId('login-username-input-error');
	const passwordError = queryByTestId('login-password-input-error');
	expect(usernameError).toBeFalsy();
	expect(passwordError).toBeFalsy();
});

test('Should trigger error', async () => {
	const { getByTestId, queryByTestId } = render(
		<TestSafeAreaProvider>
			<Providers>
				<Login />
			</Providers>
		</TestSafeAreaProvider>,
	);

	const submitButton = getByTestId('login-submit-button');

	await act(async () => {
		fireEvent.press(submitButton);
	});
	const usernameError = queryByTestId('login-username-input-error');
	const passwordError = queryByTestId('login-password-input-error');
	expect(usernameError).toBeTruthy();
	expect(passwordError).toBeTruthy();
});
