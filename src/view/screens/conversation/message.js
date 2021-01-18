import React, { memo, useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { AuthContext } from 'Stores';
import { useThemeColor, useTranslation } from 'Stores/ui';
import { Colors } from 'Styles/colors';
import { FontSize } from 'Styles/typography';
import FileMessage from './fileMessage';

const Message = ({
	user,
	image,
	message,
	file,
	timestamp,
	isRead,
	accessibilityLabel,
	...props
}) => {
	const { colorize } = useThemeColor();
	const { translate } = useTranslation();
	const { user: authUser } = useContext(AuthContext);
	const isMe = authUser?.name === user;

	return (
		<View
			style={[styles.row, isMe ? styles.right : styles.left]}
			accessibilityLabel={accessibilityLabel}
			{...props}>
			<View
				style={[
					styles.box,
					isMe
						? {
								...styles.messageBoxMe,
								backgroundColor: colorize('background'),
						  }
						: styles.messageBoxOther,
				]}>
				{!isMe && <Text style={styles.messageUser}>{user}</Text>}
				<View style={styles.messageContainer}>
					{image && (
						<Image
							accessibilityLabel={`${accessibilityLabel}-image`}
							source={{ uri: image }}
							style={styles.messageImage}
						/>
					)}
					{file && (
						<FileMessage
							accessibilityLabel={`${accessibilityLabel}-file`}
							style={{
								...styles.fileMessage,
								borderColor: colorize('background'),
							}}
							name={file?.name}
							uri={file?.uri}
						/>
					)}
					{message !== '' && (
						<Text
							style={[
								styles.message,
								isMe ? styles.messageMe : {},
							]}>
							{message}
						</Text>
					)}
				</View>
				<View style={styles.messageInfo}>
					<Text style={[styles.time, isMe ? styles.timeMe : {}]}>
						{timestamp}
					</Text>
					{isMe && (
						<Text style={[styles.read, isMe ? styles.readMe : {}]}>
							{isRead
								? translate('screens.conversation.read')
								: translate('screens.conversation.unread')}
						</Text>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 8,
	},
	box: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 10,
		marginVertical: 12,
		flexDirection: 'column',
		justifyContent: 'center',
		width: 280,
	},
	messageBoxMe: {
		borderWidth: 2,
		borderColor: Colors.primary,
	},
	messageBoxOther: {
		backgroundColor: Colors.primary,
	},
	messageUser: {
		color: Colors.white,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	messageContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignSelf: 'center',
		width: '100%',
	},
	messageImage: {
		height: 150,
		borderRadius: 10,
	},
	message: {
		fontSize: FontSize.XL,
		color: Colors.white,
	},
	messageMe: {
		color: Colors.primary,
	},
	fileMessage: {
		borderWidth: 1,
	},
	messageInfo: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 4,
	},
	time: {
		fontSize: FontSize.S,
		color: Colors.white,
	},
	timeMe: {
		color: Colors.primary,
	},
	readMe: {
		color: Colors.primary,
	},
	read: {
		fontSize: FontSize.S,
		color: Colors.white,
		marginStart: 12,
	},
	left: {
		justifyContent: 'flex-start',
	},
	right: {
		justifyContent: 'flex-end',
	},
});

Message.propTypes = {
	user: PropTypes.string,
	image: PropTypes.string,
	message: PropTypes.string,
	file: PropTypes.object,
	timestamp: PropTypes.string,
	isRead: PropTypes.bool,
};

export default memo(Message);
