import React, { memo, useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { AuthContext } from 'Stores';
import { useThemeColor, useTranslation } from 'Stores/ui';
import { Colors } from 'Styles/colors';
import { FontSize } from 'Styles/typography';
import FileMessage from './fileMessage';

const Message = ({ user, image, message, file, timestamp, isRead }) => {
  const { colorize } = useThemeColor();
  const { translate } = useTranslation();
  const { user: authUser } = useContext(AuthContext);
  const isMe = authUser?.name === user;

  return (
    <View style={[styles.row, isMe ? styles.right : styles.left]}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: colorize('boxBackground'),
          },
        ]}>
        {!isMe && <Text style={styles.messageUser}>{user}</Text>}
        <View style={styles.messageContainer}>
          {image && (
            <Image source={{ uri: image }} style={styles.messageImage} />
          )}
          {file && (
            <FileMessage
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
                {
                  color: colorize('text'),
                },
              ]}>
              {message}
            </Text>
          )}
        </View>
        <View style={styles.messageInfo}>
          <Text
            style={[
              styles.time,
              {
                color: colorize('textWashOut'),
              },
            ]}>
            {timestamp}
          </Text>
          {isMe && (
            <Text
              style={[
                styles.read,
                {
                  color: colorize('textWashOut'),
                },
              ]}>
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
  messageUser: {
    color: Colors.secondary,
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
  },
  read: {
    fontSize: FontSize.S,
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
