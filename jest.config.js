module.exports = {
	preset: 'react-native',
	setupFilesAfterEnv: [
		'@testing-library/jest-native/extend-expect',
		'./src/jest/after-env.js',
	],
	setupFiles: [
		'./src/jest/setup.js',
		'./node_modules/react-native-gesture-handler/jestSetup.js',
	],
	transformIgnorePatterns: [
		'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
	],
	moduleNameMapper: {
		'\\.svg': '<rootDir>/__mocks__/react-native-svg.js',
	},
};
