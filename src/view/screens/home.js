import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { ChatContext } from 'Stores';
import Header from 'Components/header';
import List from 'Components/list';
import Floating from 'Components/floating';
import Layout from 'Components/layout';
import ListItem from 'Components/listItem';
import Icon from 'Components/icon';
import Avatar from 'Components/avatar';

const Home = () => {
	const { colorize } = useThemeColor();
	const { navigate } = useNavigation();
	const { translate } = useTranslation();
	const { chatList, getChatList, chatErrorMsg, isGettingList } = useContext(
		ChatContext,
	);

	const renderListItem = ({ item }) => {
		return (
			<ListItem
				icon={<Avatar uri={item?.avatar} />}
				title={item?.name}
				description={item?.lastMessage}
				onClick={() =>
					navigate('Conversation', {
						conversationId: item.id,
						avatar: item?.avatar,
						name: item?.name,
					})
				}
			/>
		);
	};

	useEffect(() => {
		if (!chatList.length) {
			getChatList();
		}
	}, [chatList, getChatList]);

	return (
		<Layout>
			<Header label={translate('screens.home.title')}>
				<Icon
					name="setting"
					color={colorize('text')}
					style={styles.icon}
					onClick={() => navigate('Setting')}
				/>
			</Header>
			<List
				style={styles.list}
				data={chatList}
				isLoading={isGettingList}
				renderItem={renderListItem}
				onMoreData={getChatList}
				error={chatErrorMsg}
				emptyMsg={translate('screens.home.empty')}
			/>
			<Floating icon="pen" onClick={() => navigate('Contact')} />
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {},
	icon: {
		height: 30,
		width: 30,
	},
});

export default Home;
