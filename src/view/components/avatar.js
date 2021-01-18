import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
import Images from 'Assets/images';
import Icon from 'Components/icon';
import { Colors } from 'Styles/colors';

const Avatar = ({ testID, style, isSelected, color, uri }) => {
	const [isDefault, setIsDefault] = useState(true);

	const onImageLoad = useCallback(() => {
		setIsDefault(false);
	}, [setIsDefault]);

	if (isSelected) {
		return (
			<Icon
				testID="avatar-selected"
				name="tick"
				color={Colors.white}
				width="50%"
				height="50%"
				style={{
					...styles.avatar,
					...styles.icon,
					backgroundColor: color ?? Colors.primary,
					...style,
				}}
			/>
		);
	}

	if (!uri) {
		return (
			<Icon
				testID="avatar-default"
				name="group"
				color={Colors.white}
				width="50%"
				height="50%"
				style={{
					...styles.avatar,
					...styles.icon,
					backgroundColor: color ?? Colors.primary,
					...style,
				}}
			/>
		);
	}

	return (
		<Image
			testID={testID ?? 'avatar'}
			source={isDefault ? Images.User : { uri }}
			onLoad={onImageLoad}
			defaultSource={Images.User}
			style={[styles.avatar, style]}
		/>
	);
};

const styles = StyleSheet.create({
	avatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		resizeMode: 'cover',
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

Avatar.propTypes = {
	testID: PropTypes.string,
	isSelected: PropTypes.bool,
	uri: PropTypes.string,
	color: PropTypes.string,
};

export default memo(Avatar);
