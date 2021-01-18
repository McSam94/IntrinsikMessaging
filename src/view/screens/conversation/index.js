import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { ConversationContext } from 'Stores';
import Layout from 'Components/layout';
import Header from 'Components/header';
import Avatar from 'Components/avatar';
import List from 'Components/list';
import Icon from 'Components/icon';
import { FontSize } from 'Styles/typography';
import { Colors, Shadow } from 'Styles/colors';
import { ALLOWED_FILE_TYPE } from 'Utils/constants';
import CONSTANT from 'Styles/constant';
import Message from './message';
import Footer from './footer';

const Conversation = () => {
	const { navigate } = useNavigation();
	const { translate } = useTranslation();
	const { width } = useWindowDimensions();
	const shouldShow = useRef(new Animated.Value(0)).current;
	const [isMediaVisible, setIsMediaVisible] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const {
		params: { contactIds, conversationId, name, avatar },
	} = useRoute();
	const {
		getConversation,
		newConversation,
		isGottenList,
		isCreating,
		isCreated,
		isGroupConversation,
		conversationList,
		conversationPage,
		conversationErrorMsg,
		resetConversation,
		sendMessage,
	} = useContext(ConversationContext);

	const loadMoreData = useCallback(() => {
		if (!contactIds) {
			getConversation(conversationId, conversationPage);
		}
	}, [contactIds, getConversation, conversationId, conversationPage]);

	const backToHome = useCallback(() => {
		navigate('Home');
	}, [navigate]);

	const closePreview = useCallback(() => {
		setImagePreview(null);
		setFilePreview(null);
	}, []);

	const sendMessageFn = useCallback(
		(message) => {
			sendMessage({ message, image: imagePreview, file: filePreview });
			setImagePreview(null);
			setFilePreview(null);
		},
		[sendMessage, setImagePreview, imagePreview, filePreview],
	);

	const openMedia = useCallback(() => {
		setIsMediaVisible((prevState) => !prevState);
	}, [setIsMediaVisible]);

	const openCamera = useCallback(() => {
		setIsMediaVisible(false);
		launchCamera(
			{ mediaType: 'photo', quality: 1 },
			({ errorCode, uri }) => {
				if (errorCode === 'camera_unavailable') {
					Toast.show({
						type: 'error',
						text1: translate(
							'screens.conversation.camera_unavailable',
						),
					});
				} else {
					setFilePreview(null);
					setImagePreview(uri);
				}
			},
		);
	}, [translate]);

	const openGallery = useCallback(() => {
		setIsMediaVisible(false);
		launchImageLibrary(
			{ mediaType: 'photo', quality: 1 },
			({ errorMessage, didCancel, uri }) => {
				if (errorMessage) {
					Toast.show({
						type: 'error',
						text2: errorMessage,
					});
				} else if (!didCancel) {
					setFilePreview(null);
					setImagePreview(uri);
				}
			},
		);
	}, []);

	const openFilePicker = useCallback(async () => {
		setIsMediaVisible(false);
		const res = await DocumentPicker.pick({
			type: ALLOWED_FILE_TYPE,
		});

		setImagePreview(null);
		setFilePreview(res);
	}, []);

	const positionXInterpolation = shouldShow.interpolate({
		inputRange: [0, 1],
		outputRange: [-1 * width, 0],
		extrapolate: 'clamp',
	});

	const renderConversation = ({ item }) => {
		return <Message accessibilityLabel="conversation-message" {...item} />;
	};

	useEffect(() => {
		Animated.timing(shouldShow, {
			toValue: isMediaVisible ? 1 : 0,
			duration: CONSTANT.CONVERSATION.ANIMATION_DURATION,
			useNativeDriver: false,
		}).start();
	}, [isMediaVisible, shouldShow]);

	useEffect(() => {
		if (contactIds && !isCreated && !isCreating) {
			newConversation(contactIds);
		}
		if (!contactIds && conversationId) {
			if (!isGottenList) {
				getConversation(conversationId, conversationPage);
			}
		}
	}, [
		isGroupConversation,
		contactIds,
		isCreating,
		isCreated,
		conversationId,
		conversationPage,
		newConversation,
		getConversation,
		resetConversation,
		isGottenList,
	]);

	useEffect(() => {
		return () => resetConversation();
	}, [resetConversation]);

	return (
		<Layout>
			<Header
				testID="conversation-header"
				style={styles.header}
				label={name}
				avatar={<Avatar uri={avatar} style={styles.avatar} />}
				navigate={backToHome}
			/>
			<View style={styles.conversation}>
				<List
					testID="conversation-list"
					data={conversationList}
					isLoading={!isGottenList}
					renderItem={renderConversation}
					onMoreData={loadMoreData}
					error={conversationErrorMsg}
					emptyMsg={translate('screens.conversation.empty')}
					shouldShowSeperator={false}
					inverted
				/>
				<Animated.View
					testID="conversation-tools"
					style={[
						styles.mediaContainer,
						{
							left: positionXInterpolation,
						},
					]}>
					<MediaButton
						testID="conversation-camera"
						icon="camera"
						label={translate('screens.conversation.camera')}
						onClick={openCamera}
					/>
					<MediaButton
						testID="conversation-gallery"
						icon="image"
						label={translate('screens.conversation.image')}
						onClick={openGallery}
					/>
					<MediaButton
						testID="conversation-file"
						icon="file"
						label={translate('screens.conversation.file')}
						onClick={openFilePicker}
					/>
				</Animated.View>
			</View>
			<Footer
				testID="conversation-footer"
				image={imagePreview}
				file={filePreview}
				onClosePreview={closePreview}
				onOpenMedia={openMedia}
				onSendMessage={sendMessageFn}
			/>
		</Layout>
	);
};

const MediaButton = ({ testID, icon, label, onClick }) => {
	const { colorize } = useThemeColor();

	return (
		<Icon
			testID={testID}
			name={icon}
			label={label}
			color={Colors.primary}
			style={{
				...styles.mediaIcon,
				backgroundColor: colorize('background'),
			}}
			labelStyle={{ color: colorize('text') }}
			width="50%"
			height="50%"
			onClick={onClick}
		/>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: FontSize.XXL,
		paddingVertical: 16,
		marginStart: 12,
	},
	avatar: {
		height: 40,
		width: 40,
	},
	conversation: {
		flex: 1,
		flexDirection: 'column',
		position: 'relative',
	},
	mediaContainer: {
		borderRadius: 15,
		position: 'absolute',
		flexDirection: 'row',
		bottom: 10,
		left: 0,
		right: 0,
	},
	mediaIcon: {
		width: 100,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 8,
		...Shadow,
	},
});

export default Conversation;
