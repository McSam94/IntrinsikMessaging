module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          Assets: './src/assets',
          Stores: './src/store',
          Utils: './src/utils',
          Components: './src/view/components',
          Screens: './src/view/screens',
          Navigation: './src/navigation',
          Styles: './src/styles',
          i18n: './src/i18n',
          Services: './src/services',
          Test: './src/jest',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowUndefined: false,
      },
    ],
  ],
};
