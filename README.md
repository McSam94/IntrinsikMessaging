# IntrinsikMessaging

## Content

-   [Installation](#installation)
-   [Script](#scripts)
-   [Development](#development)

<br />

## Installation

1. Make sure you have dependencies installed on your machine
    - `Node.js` (v14.7.0 recommended)
2. Setup enviroment as per React-native's documentation (https://reactnative.dev/docs/environment-setup) for both Android & IOS
3. Clone the project
4. Run `yarn` to install all the dependencies
5. Start the project
    - [IOS] `yarn ios`
    - [Android] `yarn android`

> **Note** : If you got this error `Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65.` when you run `yarn ios`, run `yarn pod` and try again

<br />

## Scripts

|  Command  | Description                                                                                                                                                                          |
| :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   `ios`   | Runs ios version on emulator. You can pass an extra parameter (`--simulator="<model>"`) with your prefer simulator device to launch. E.g: `yarn ios --simulator="iPhone 11 Pro Max"` |
| `android` | Runs android version on emulator                                                                                                                                                     |
|  `lint`   | Runs `eslint` to fix the rules of the code as per the specs                                                                                                                          |
| `format`  | Runs `prettify` to format code as per the specs.                                                                                                                                     |
|  `test`   | Runs the test suite with eslint                                                                                                                                                      |

<br />

## Development

#### Styling

-   Make sure to use our own custom hooks `useThemeColor` from `Stores/ui` when we need color

```
const CustomComponent = () => {
	const { colorize } = useThemeColor(); <--

    return (
        <Container style={{
            backgroundColor: colorize('background') <-- parameter should be one of the key from `theme.js`
        }}>
            <Text>{'Test'}</Text>
        </Container>
    )
}
```

#### Translation

-   To define a new language in the app
    1. Go to `src/utils/constants.ts` file and define a new language constant.
    2. Go to `src/i18n` directory, create a new file using new language naming. (e.g: `en.json`) and list down all the text that need to be translate.
    3. Go to `i18n/index.js`, add the language constant you define in step 1 as **key** and import the desire json file as **value**.
-   To use translation in your app, make sure to use our own custom hooks `useTranslation` from `Stores/ui`.

```
const CustomComponent = () => {
    const { translate } = useTranslation();

    return (
        <Text>{translate('Test')}</Text>
    )
}
```

-   use `%{name}` for dynamic content

```
// en.json

{
    "Test": "Test %{name}"
}
```

```
// custom component

const CustomComponent = () => {
    const { translate } = useTrasnlation();

    return (
        <Text>{translate('Test'), {name: 'testing'}}</Text>
    )
}
```

<br />
