import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useThemeColor } from 'Stores/ui';
import { FontSize } from 'Styles/typography';
import Images from 'Assets/images';

const ListItem = ({
  style,
  titleStyle,
  descriptionStyle,
  avatar,
  title,
  description,
}) => {
  const { colorize } = useThemeColor();

  return (
    <View style={[styles.listItem, style]}>
      <Image
        source={{ uri: avatar }}
        defaultSource={Images.User}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            {
              color: colorize('textWashOut'),
            },
            titleStyle,
          ]}>
          {title}
        </Text>
        <Text style={[styles.description, descriptionStyle]} numberOfLines={1}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    flex: 2,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 12,
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
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  titleStyle: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  descriptionStyle: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  avatar: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default memo(ListItem);
