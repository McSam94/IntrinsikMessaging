import React from 'react';
import {
	cleanup,
	fireEvent,
	render,
	waitForElementToBeRemoved,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { TestSafeAreaProvider } from 'Test/mock-fn';
import { Providers } from 'Stores';
import Contact from '../contact';

afterEach(cleanup);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
	return {
		...jest.requireActual('@react-navigation/native'),
		useNavigation: () => ({
			goBack: mockedNavigate,
			canGoBack: true,
		}),
	};
});

test('Should render correctly', async () => {
	const { queryByTestId, queryAllByA11yLabel } = render(
		<TestSafeAreaProvider>
			<Providers>
				<Contact />
			</Providers>
		</TestSafeAreaProvider>,
	);
	const header = queryByTestId('contact-header');
	const proceed = queryByTestId('contact-proceed');
	expect(header).toBeTruthy();
	expect(proceed).toBeTruthy();

	const back = queryByTestId('contact-header-navigate');
	fireEvent.press(back);
	expect(mockedNavigate).toHaveBeenCalledTimes(1);

	const loading = queryByTestId('contact-list-loading');
	expect(loading).toBeTruthy();

	await waitForElementToBeRemoved(() =>
		queryByTestId('contact-list-loading'),
	);

	const list = queryByTestId('contact-list');
	expect(list).toBeTruthy();

	const categories = queryAllByA11yLabel(/^contact-category/);
	const categoriesAlphabet = categories.map(
		(category) => category.children[0],
	);
	for (let i = 1; i < categoriesAlphabet.length; i++) {
		expect(categoriesAlphabet[i] < categoriesAlphabet[i - 1]).toBeFalsy();
	}
});
