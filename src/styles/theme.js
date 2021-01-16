import { Colors } from './colors';

export default Object.freeze({
	light: {
		text: Colors.black,
		textWashOut: Colors.washout,
		textError: Colors.error,
		textColor: Colors.secondary,
		placeholder: Colors.gray,
		background: Colors.white,
		boxBackground: Colors.gray,
		border: Colors.gray,
		barStyle: 'dark-content',
	},
	dark: {
		text: Colors.white,
		textWashOut: Colors.washout,
		textError: Colors.error,
		textColor: Colors.white,
		placeholder: Colors.light,
		background: Colors.black,
		boxBackground: Colors.darkGray,
		border: Colors.light,
		barStyle: 'light-content',
	},
});
