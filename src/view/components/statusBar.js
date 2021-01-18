import React from 'react';
import {
	Platform,
	StatusBar as NativeStatusBar,
	StyleSheet,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatusBar = ({ backgroundColor, barStyle, transparent, ...props }) => {
	const { top } = useSafeAreaInsets();

	return (
		<>
			{Platform.OS === 'android' ? (
				<NativeStatusBar
					backgroundColor={backgroundColor ?? 'transparent'}
					barStyle={barStyle}
					translucent={transparent}
					{...props}
				/>
			) : (
				<View
					style={[
						styles.container,
						{
							height: top,
							backgroundColor: backgroundColor,
						},
						transparent ? styles.transparentStatusBar : {},
					]}>
					<NativeStatusBar
						backgroundColor={backgroundColor}
						barStyle={barStyle}
						translucent={transparent}
					/>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 5,
	},
	transparentStatusBar: {
		position: 'absolute',
	},
});

export default StatusBar;
