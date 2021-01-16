import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UiContext } from 'Stores';
import { Provider as UiProvider } from 'Stores/ui';

export function TestSafeAreaProvider({ children }) {
	return (
		<SafeAreaProvider
			initialMetrics={{
				frame: { x: 0, y: 0, width: 0, height: 0 },
				insets: { top: 0, left: 0, right: 0, bottom: 0 },
			}}>
			{children}
		</SafeAreaProvider>
	);
}

export function UpdateThemeProvider({ children }) {
	return (
		<UiProvider>
			{children}
			<UpdateThemeConsumer />
		</UiProvider>
	);
}

function UpdateThemeConsumer() {
	const { updateTheme } = useContext(UiContext);

	return (
		<TouchableOpacity
			testID="darkmode-button"
			onPress={() => updateTheme('dark')}
		/>
	);
}
