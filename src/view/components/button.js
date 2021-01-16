import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeColor } from 'Stores/ui';
import { Colors, Shadow } from 'Styles/colors';

const Button = ({ testID, style, isLink, label, onClick, ...props }) => {
	const { colorize } = useThemeColor();

	return (
		<TouchableOpacity
			testID={testID ?? 'button'}
			style={[
				styles.container,
				{
					backgroundColor: isLink
						? colorize('background')
						: Colors.primary,
				},
				!isLink ? styles.primaryButton : {},
				style,
			]}
			onPress={onClick}
			{...props}>
			<Text
				testID={testID ? `${testID}-label` : 'button-label'}
				style={[
					styles.label,
					{
						color: isLink ? Colors.primary : Colors.white,
					},
				]}>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderRadius: 5,
	},
	primaryButton: {
		width: '100%',
		paddingVertical: 12,
		...Shadow,
	},
	label: {},
});

Button.propTypes = {
	testID: PropTypes.string,
	style: PropTypes.object,
	isLink: PropTypes.bool,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

export default memo(Button);
