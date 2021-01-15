import DocumentPicker from 'react-native-document-picker';

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
