import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useThemeColor, useTranslation } from 'Stores/ui';
import { FontSize } from 'Styles/typography';
import { Colors } from 'Styles/colors';

const Loader = ({ testID, style, size, message, color }) => {
	const { colorize } = useThemeColor();
	const { translate } = useTranslation();

	return (
		<View testID={testID ?? 'loader'} style={[styles.container, style]}>
			<ActivityIndicator
				size={size ?? 'large'}
				color={color ?? Colors.primary}
			/>
			<Text
				style={[
					styles.text,
					{
						color: colorize('textWashOut'),
					},
				]}>
				{message ?? translate('components.loader.loading')}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: FontSize.L,
		marginTop: 26,
	},
});

Loader.propTypes = {
	testID: PropTypes.string,
	style: PropTypes.object,
	size: PropTypes.oneOf(['large', 'small']),
	message: PropTypes.string,
	color: PropTypes.string,
};

export default memo(Loader);
