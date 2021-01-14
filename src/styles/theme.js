import { Colors } from './colors';

export default Object.freeze({
  light: {
    text: Colors.black,
    textWashOut: Colors.washout,
    textError: Colors.error,
    placeholder: Colors.gray,
    background: Colors.white,
    border: Colors.gray,
  },
  dark: {
    text: Colors.white,
    textWashOut: Colors.washout,
    textError: Colors.error,
    placeholder: Colors.light,
    background: Colors.black,
    border: Colors.light,
  },
});
