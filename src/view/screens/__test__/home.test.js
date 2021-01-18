import React from 'react';
import {
	cleanup,
	render,
	waitForElementToBeRemoved,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { TestSafeAreaProvider } from 'Test/mock-fn';
import { Providers } from 'Stores';
import Home from '../home';

afterEach(cleanup);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
	return {
		...jest.requireActual('@react-navigation/native'),
		useNavigation: () => ({
			navigate: mockedNavigate,
		}),
	};
});

test('Should render correctly', async () => {
	const { queryByTestId } = render(
		<TestSafeAreaProvider>
			<Providers>
				<Home />
			</Providers>
		</TestSafeAreaProvider>,
	);
	const header = queryByTestId('home-header');
	const setting = queryByTestId('home-setting');
	const floating = queryByTestId('home-floating');
	expect(header).toBeTruthy();
	expect(setting).toBeTruthy();
	expect(floating).toBeTruthy();

	const loading = queryByTestId('home-list-loading');
	expect(loading).toBeTruthy();

	await waitForElementToBeRemoved(() => queryByTestId('home-list-loading'));

	const list = queryByTestId('home-list');
	expect(list).toBeTruthy();
});
