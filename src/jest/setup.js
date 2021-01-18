/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {
	fireEvent,
	waitForElementToBeRemoved,
} from '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-image-picker', () => {
	return {
		...jest.requireActual('react-native-image-picker'),
		launchCamera: (options, cb) => {
			cb({
				uri: 'https://robohash.org/est.png?size=300x300',
			});
		},
		launchImageLibrary: (options, cb) => {
			cb({
				uri: 'https://robohash.org/est.png?size=300x300',
				didCancel: false,
			});
		},
	};
});

jest.mock('react-native-document-picker', () => {
	return {
		...jest.requireActual('react-native-document-picker'),
		pick: async (options) =>
			Promise.resolve({
				uri:
					'file:///Users/mcsam/Library/Developer/CoreSimulator/Devices/6DEC39BE-4D35-499F-988A-BCCE90B4458A/data/Containers/Data/Application/DD0AD215-57F0-45DA-AC98-3E38D8E9539C/tmp/org.reactjs.native.example.IntrinsikReactNativeTest-Inbox/sample.pdf',
				name: 'sample.pdf',
				size: 3028,
				type: 'application/pdf',
			}),
		types: {
			pdf: '',
			doc: '',
			zip: '',
			plainText: '',
			docx: '',
			ppt: '',
			pptx: '',
			xls: '',
			xlsx: '',
		},
	};
});

global.login = async ({ queryByTestId, getByTestId, findByTestId }) => {
	expect(queryByTestId('login-name')).toBeTruthy();

	fireEvent.changeText(getByTestId('login-username-input'), 'test');
	fireEvent.changeText(getByTestId('login-password-input'), '123456');

	const submitButton = getByTestId('login-submit-button');
	fireEvent.press(submitButton);

	await findByTestId('home-header');
	await waitForElementToBeRemoved(() => queryByTestId('home-list-loading'));

	expect(queryByTestId('home-list')).toBeTruthy();
};
