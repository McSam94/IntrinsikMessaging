export const Colors = Object.freeze({
	primary: '#38a3a5',
	secondary: '#57cc99',
	tertiary: '#80ed99',
	black: '#000000',
	washout: '#8d99ae',
	white: '#ffffff',
	gray: '#d9d9d9',
	darkGray: '#595959',
	light: '#ebebeb',
	error: '#ff4d4d',
	info: '#3399ff',
});

export const Gradients = Object.freeze({
	gradient_1: [Colors.primary, Colors.secondary, Colors.light],
});

export const Shadow = {
	shadowColor: Colors.washout,
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.23,
	shadowRadius: 2.62,

	elevation: 4,
};
