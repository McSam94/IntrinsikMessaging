import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'Components/icon';
import { Colors } from 'Styles/colors';
import { FontSize } from 'Styles/typography';

const FileMessage = ({ testID, style, name, ...props }) => {
	return (
		<View testID={testID} style={[styles.fileContainer, style]} {...props}>
			<Icon name="file" color={Colors.darkGray} />
			<Text style={styles.fileName}>{name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	fileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.gray,
		padding: 12,
		borderRadius: 5,
		width: '100%',
	},
	fileName: {
		fontSize: FontSize.XL,
		color: Colors.black,
		marginLeft: 12,
	},
	download: {
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 'auto',
		borderWidth: 1,
		borderRadius: 25,
		height: 40,
		width: 40,
	},
});

FileMessage.propTypes = {
	testID: PropTypes.string,
	style: PropTypes.object,
	name: PropTypes.string,
};

export default memo(FileMessage);
