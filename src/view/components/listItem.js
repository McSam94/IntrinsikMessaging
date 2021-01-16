import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useThemeColor } from 'Stores/ui';
import { FontSize } from 'Styles/typography';

const ListItem = ({
	testID,
	style,
	titleStyle,
	descriptionStyle,
	icon,
	title,
	description,
	onClick,
}) => {
	const { colorize } = useThemeColor();

	return (
		<TouchableOpacity
			testID={testID ?? 'listitem'}
			style={[styles.listItem, style]}
			onPress={onClick}>
			{icon}
			<View
				testID={testID ? `${testID}-title` : 'listitem-title'}
				style={styles.info}>
				{title && (
					<Text
						style={[
							styles.title,
							{
								color: colorize('text'),
							},
							titleStyle,
						]}>
						{title}
					</Text>
				)}
				{description && (
					<Text
						testID={
							testID
								? `${testID}-description`
								: 'listitem-description'
						}
						style={[
							styles.description,
							{
								color: colorize('text'),
							},
							descriptionStyle,
						]}
						numberOfLines={1}>
						{description}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	listItem: {
		paddingVertical: 25,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		resizeMode: 'contain',
	},
	icon: {
		height: 50,
		width: 50,
	},
	info: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		marginLeft: 14,
		flex: 8,
	},
	title: {
		fontSize: FontSize.XXL,
		fontWeight: 'bold',
	},
	description: {
		fontSize: FontSize.M,
	},
});

ListItem.propTypes = {
	testID: PropTypes.string,
	style: PropTypes.object,
	titleStyle: PropTypes.object,
	descriptionStyle: PropTypes.object,
	icon: PropTypes.node,
	title: PropTypes.string,
	description: PropTypes.string,
};

export default memo(ListItem);
