import React from 'react';
import {
	cleanup,
	fireEvent,
	render,
	waitFor,
	waitForElementToBeRemoved,
	within,
} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { TestSafeAreaProvider, MockProvider } from 'Test/mock-fn';
import { Providers } from 'Stores';
import Navigation from '../index';

afterEach(cleanup);

test('Navigate home after login', async () => {
	const renderer = render(
		<TestSafeAreaProvider>
			<Providers>
				<MockProvider>
					<Navigation />
				</MockProvider>
			</Providers>
		</TestSafeAreaProvider>,
	);
	const { queryByTestId } = renderer;

	await global.login(renderer);

	expect(queryByTestId('home-header-title')).toHaveTextContent('Chat');
});

test('Navigate to conversation after select a conversation', async () => {
	const renderer = render(
		<TestSafeAreaProvider>
			<Providers>
				<MockProvider>
					<Navigation />
				</MockProvider>
			</Providers>
		</TestSafeAreaProvider>,
	);
	const { queryByTestId, queryAllByA11yLabel } = renderer;

	await global.login(renderer);

	const firstConversation = queryAllByA11yLabel('home-item')?.[0];
	const firstListItem = within(firstConversation);
	const firstName = firstListItem.getByTestId('listitem-title').children[0];
	expect(firstConversation).toBeTruthy();
	fireEvent.press(firstConversation);

	await waitFor(() => {
		expect(queryByTestId('conversation-header-title')).toHaveTextContent(
			firstName,
		);
	});
}, 15000);

test('Navigate contact after select pen icon', async () => {
	const renderer = render(
		<TestSafeAreaProvider>
			<Providers>
				<MockProvider>
					<Navigation />
				</MockProvider>
			</Providers>
		</TestSafeAreaProvider>,
	);
	const { queryByTestId } = renderer;

	await global.login(renderer);

	fireEvent.press(queryByTestId('home-floating'));
	await waitFor(() => {
		expect(queryByTestId('contact-header-title')).toHaveTextContent(
			'Contact',
		);
	});
});

test('Navigate new conversation selected contact', async () => {
	const renderer = render(
		<TestSafeAreaProvider>
			<Providers>
				<MockProvider>
					<Navigation />
				</MockProvider>
			</Providers>
		</TestSafeAreaProvider>,
	);
	const { queryByTestId, queryAllByA11yLabel, findByTestId } = renderer;

	await global.login(renderer);

	fireEvent.press(queryByTestId('home-floating'));
	await waitFor(() => {
		expect(queryByTestId('contact-header-title')).toHaveTextContent(
			'Contact',
		);
	});

	await waitForElementToBeRemoved(() =>
		queryByTestId('contact-list-loading'),
	);
	const contactList = queryAllByA11yLabel('contact-item');
	fireEvent.press(contactList[0]);
	const firstListItem = within(contactList[0]);
	await waitFor(() => firstListItem.getByTestId('avatar-selected'));

	fireEvent.press(contactList[1]);
	const secondListItem = within(contactList[1]);
	await waitFor(() => secondListItem.getByTestId('avatar-selected'));

	fireEvent.press(queryByTestId('contact-proceed'));
	await findByTestId('conversation-header');
});
