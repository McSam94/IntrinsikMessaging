import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import StatusBar from 'Components/statusBar';
import { useThemeColor } from 'Stores/ui';

const Layout = ({ statusBarColor, barStyle, children }) => {
	const { colorize } = useThemeColor();

	return (
		<>
			<StatusBar
				backgroundColor={statusBarColor ?? colorize('background')}
				barStyle={barStyle ?? colorize('barStyle')}
			/>
			<View
				style={[
					styles.container,
					{
						backgroundColor: colorize('background'),
					},
				]}>
				{children}
			</View>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
	]),
	statusBarColor: PropTypes.string,
	barStyle: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default memo(Layout);
