import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import { TestSafeAreaProvider } from 'Test/mock-fn';
import Floating from '../floating';

afterEach(cleanup);

test('Render correctly', async () => {
	const mockFn = jest.fn();
	const { getByTestId } = render(
		<TestSafeAreaProvider>
			<Floating icon="pen" onClick={mockFn} />
		</TestSafeAreaProvider>,
	);

	const floating = getByTestId('floating');
	expect(floating).toBeTruthy();

	fireEvent.press(floating);

	expect(mockFn.mock.calls.length).toBe(1);
});
