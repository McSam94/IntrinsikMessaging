module.exports = {
	root: true,
	extends: '@react-native-community',
	plugins: ['react', 'react-hooks'],
	rules: {
		'react/react-in-jsx-scope': 0,
		'no-unused-vars': ['error'],
		'no-console': 2,
	},
};
