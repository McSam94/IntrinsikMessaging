import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { ConversationContext } from 'Stores';
import Layout from 'Components/layout';
import Header from 'Components/header';
import { FontSize } from 'Styles/typography';
import { Colors } from 'Styles/colors';

const Conversation = () => {
  const { translate } = useTranslation();
  const { colorize } = useThemeColor();
  const {
    params: {
      user: { userId, nickname, avatar },
    },
  } = useRoute();
  const { getConversation, conversationList } = useContext(ConversationContext);

  useEffect(() => {
    if (!conversationList.length) {
      getConversation(userId);
    }
  }, [conversationList, getConversation, userId]);

  return (
    <Layout>
      <Header label={nickname} avatar={avatar} canBack />
      <View style={styles.conversation}>
        {conversationList.map((conversation) => (
          <View
            style={[
              styles.box,
              conversation.isMe ? styles.right : styles.left,
            ]}>
            <Text
              style={[
                styles.message,
                {
                  color: colorize('text'),
                },
              ]}>
              {conversation.message}
            </Text>
            <View style={styles.messageInfo}>
              <Text
                style={[
                  styles.time,
                  {
                    color: colorize('textWashOut'),
                  },
                ]}>
                {conversation.timestamp}
              </Text>
              <Text
                style={[
                  styles.read,
                  {
                    color: colorize('textWashOut'),
                  },
                ]}>
                {conversation.isRead
                  ? translate('screens.conversation.read')
                  : translate('screens.conversation.unread')}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  conversation: {
    flex: 1,
    flexDirection: 'column',
  },
  box: {
    borderRadius: 25,
    backgroundColor: Colors.gray,
  },
  message: {
    fontSize: FontSize.XL,
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: FontSize.S,
  },
  read: {
    fontSize: FontSize.S,
  },
  left: {
    alignSelf: 'flex-start',
  },
  right: {
    alignSelf: 'flex-end',
  },
});

export default Conversation;
