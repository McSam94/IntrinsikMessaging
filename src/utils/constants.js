import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'Components/toast';

export const RESPONSE_STATUS = Object.freeze({
	SUCCESS: 200,
	SERVER_ERROR: 500,
});

export const Language = Object.freeze({
	english: 'en',
	chinese: 'zh',
});

export const ALLOWED_FILE_TYPE = [
	DocumentPicker.types.pdf,
	DocumentPicker.types.doc,
	DocumentPicker.types.zip,
	DocumentPicker.types.plainText,
	DocumentPicker.types.docx,
	DocumentPicker.types.ppt,
	DocumentPicker.types.pptx,
	DocumentPicker.types.xls,
	DocumentPicker.types.xlsx,
];

export const TOAST_CONFIG = {
	success: ({ text1 }) => <Toast type="success" text={text1} />,
	error: ({ text1 }) => <Toast type="error" text={text1} />,
	info: ({ text1 }) => <Toast type="info" text={text1} />,
};

export const API_DELAY = 1500;
