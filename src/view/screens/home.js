import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { ChatContext } from 'Stores';
import Header from 'Components/header';
import List from 'Components/list';
import Floating from 'Components/floating';
import Layout from 'Components/layout';
import ListItem from 'Components/listItem';

const Home = () => {
  const { navigate } = useNavigation();
  const { translate } = useTranslation();
  const { chatList, getChatList, chatErrorMsg, isGettingList } = useContext(
    ChatContext,
  );

  useEffect(() => {
    if (!chatList.length) {
      getChatList();
    }
  }, [chatList, getChatList]);

  return (
    <Layout>
      <Header label={translate('screens.home.title')} />
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

const renderListItem = ({ item }) => {
  return (
    <ListItem
      avatar={item?.avatar}
      title={item?.name}
      description={item?.lastMessage}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
});

export default Home;
