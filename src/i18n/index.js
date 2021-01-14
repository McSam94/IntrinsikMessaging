import { Language } from 'Utils/constants';

export const translationGetters = {
  [Language.chinese]: () => require('./zh.json'),
  [Language.english]: () => require('./en.json'),
};
