import React from 'react';
import {
	cleanup,
	render,
	fireEvent,
	waitForElementToBeRemoved,
	waitFor,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { TestSafeAreaProvider } from 'Test/mock-fn';
import { Providers } from 'Stores';
import Conversation from '../conversation';

afterEach(cleanup);

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
	return {
		...jest.requireActual('@react-navigation/native'),
		useNavigation: () => ({
			navigate: mockedNavigate,
		}),
		useRoute: () => ({
			params: {
				conversationId: 'uy2d9',
				name: 'John Cena',
				avatar: 'https://robohash.org/est.png?size=300x300',
			},
		}),
	};
});

test('Should render correctly', async () => {
	const { getByTestId, queryByTestId } = render(
		<TestSafeAreaProvider>
			<Providers>
				<Conversation />
			</Providers>
		</TestSafeAreaProvider>,
	);
	const header = getByTestId('conversation-header');
	expect(header).toBeTruthy();

	const title = getByTestId('conversation-header-title');
	expect(title).toHaveTextContent('John Cena');

	const back = queryByTestId('conversation-header-navigate');
	fireEvent.press(back);
	expect(mockedNavigate).toHaveBeenCalledTimes(1);

	const loading = queryByTestId('conversation-list-loading');
	expect(loading).toBeTruthy();

	await waitForElementToBeRemoved(() =>
		queryByTestId('conversation-list-loading'),
	);

	const list = queryByTestId('conversation-list');
	expect(list).toBeTruthy();
});

test('Send image from camera', async () => {
	const {
		getByTestId,
		queryByTestId,
		queryAllByA11yLabel,
		findByTestId,
	} = render(
		<TestSafeAreaProvider>
			<Providers>
				<Conversation />
			</Providers>
		</TestSafeAreaProvider>,
	);

	expect(queryByTestId('conversation-list-loading')).toBeTruthy();

	await waitForElementToBeRemoved(() =>
		queryByTestId('conversation-list-loading'),
	);

	const list = queryByTestId('conversation-list');
	expect(list).toBeTruthy();
	fireEvent.press(getByTestId('conversation-clip'));
	await waitFor(() => {
		expect(getByTestId('conversation-tools')).toHaveStyle({ left: 0 });
	});

	fireEvent.press(getByTestId('conversation-camera'));
	await waitFor(() => {
		expect(getByTestId('conversation-tools')).not.toHaveStyle({ left: 0 });
	});
	expect(queryByTestId('conversation-image-preview')).toBeTruthy();

	fireEvent.press(getByTestId('conversation-send'));
	expect(queryByTestId('conversation-image-preview')).toBeFalsy();
	await waitFor(() => {
		expect(queryAllByA11yLabel('conversation-message-image').length).toBe(
			1,
		);
	});
}, 15000);

test('Send image from gallery', async () => {
	const { getByTestId, queryByTestId, queryAllByA11yLabel } = render(
		<TestSafeAreaProvider>
			<Providers>
				<Conversation />
			</Providers>
		</TestSafeAreaProvider>,
	);

	expect(queryByTestId('conversation-list-loading')).toBeTruthy();

	await waitForElementToBeRemoved(() =>
		queryByTestId('conversation-list-loading'),
	);

	const list = queryByTestId('conversation-list');
	expect(list).toBeTruthy();
	fireEvent.press(getByTestId('conversation-clip'));
	await waitFor(() => {
		expect(getByTestId('conversation-tools')).toHaveStyle({ left: 0 });
	});

	fireEvent.press(getByTestId('conversation-gallery'));
	await waitFor(() => {
		expect(getByTestId('conversation-tools')).not.toHaveStyle({ left: 0 });
	});
	expect(queryByTestId('conversation-image-preview')).toBeTruthy();

	fireEvent.press(getByTestId('conversation-send'));
	expect(queryByTestId('conversation-image-preview')).toBeFalsy();
	await waitFor(() => {
		expect(queryAllByA11yLabel('conversation-message-image').length).toBe(
			1,
		);
	});
}, 15000);

test('Send file', async () => {
	const { getByTestId, queryByTestId, queryAllByA11yLabel } = render(
		<TestSafeAreaProvider>
			<Providers>
				<Conversation />
			</Providers>
		</TestSafeAreaProvider>,
	);

	expect(queryByTestId('conversation-list-loading')).toBeTruthy();

	await waitForElementToBeRemoved(() =>
		queryByTestId('conversation-list-loading'),
	);

	const list = queryByTestId('conversation-list');
	expect(list).toBeTruthy();
	fireEvent.press(getByTestId('conversation-clip'));
	await waitFor(() => {
		expect(getByTestId('conversation-tools')).toHaveStyle({ left: 0 });
	});

	fireEvent.press(getByTestId('conversation-file'));
	await waitFor(() => {
		expect(getByTestId('conversation-tools')).not.toHaveStyle({ left: 0 });
	});
	expect(queryByTestId('conversation-file-preview')).toBeTruthy();

	fireEvent.press(getByTestId('conversation-send'));
	expect(queryByTestId('conversation-file-preview')).toBeFalsy();
	await waitFor(() => {
		expect(queryAllByA11yLabel('conversation-message-file').length).toBe(1);
	});
}, 15000);
