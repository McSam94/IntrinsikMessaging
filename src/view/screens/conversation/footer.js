import React, { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeColor, useTranslation } from 'Stores/ui';
import { useInsets } from 'Utils/hooks';
import Icon from 'Components/icon';
import Input from 'Components/input';
import { FontSize } from 'Styles/typography';
import { Colors } from 'Styles/colors';
import FileMessage from './fileMessage';

const Footer = ({
  image,
  file,
  onClosePreview,
  onOpenMedia,
  onSendMessage,
}) => {
  const { colorize } = useThemeColor();
  const { translate } = useTranslation();
  const { bottom } = useInsets();
  const [message, setMessage] = useState('');

  const sendMessageFn = useCallback(() => {
    if (message === '') {
      return;
    }

    if (onSendMessage) {
      onSendMessage(message);
    }
    setMessage('');
  }, [onSendMessage, message]);

  return (
    <View
      style={[
        styles.footer,
        {
          marginBottom: bottom,
          borderTopColor: colorize('border'),
        },
      ]}>
      {(image || file) && (
        <View style={styles.previewContainer}>
          <View style={styles.previewRow}>
            <Text
              style={[
                styles.previewText,
                {
                  color: colorize('text'),
                },
              ]}>
              {translate('screens.conversation.preview')}
            </Text>
            <Icon
              name="cancel"
              color={colorize('text')}
              style={styles.close}
              onClick={onClosePreview}
            />
          </View>
          {image && <Image source={{ uri: image }} style={styles.preview} />}
          {file && <FileMessage name={file?.name} />}
        </View>
      )}
      <View style={styles.inputContainer}>
        <Icon
          name="clip"
          style={styles.attach}
          color={colorize('textWashOut')}
          onClick={onOpenMedia}
        />
        <Input
          style={styles.input}
          inputStyle={styles.field}
          placeholder={translate('screens.conversation.type')}
          placeholderTextColor={colorize('textWashOut')}
          onChangeText={(text) => setMessage(text)}
          value={message}
          multiline
        />
        <Icon
          name="send"
          style={styles.send}
          color={Colors.primary}
          onClick={sendMessageFn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    borderTopWidth: 1,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  close: {
    height: 12,
    width: 12,
  },
  previewContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  previewText: {
    fontWeight: 'bold',
    fontSize: FontSize.XL,
    marginBottom: 16,
  },
  preview: {
    height: 150,
    resizeMode: 'contain',
  },
  fileMesasge: {
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  attach: {
    height: 30,
    width: 30,
  },
  input: {
    marginHorizontal: 10,
    flex: 8,
  },
  field: {
    height: '100%',
    fontSize: FontSize.XXL,
  },
  send: {
    height: 30,
    width: 30,
  },
});

Footer.propTypes = {
  filePreview: PropTypes.object,
  imagePreview: PropTypes.string,
  onClosePreview: PropTypes.func,
  onOpenMedia: PropTypes.func,
  onSendMessage: PropTypes.func,
};

export default memo(Footer);
