import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
import Images from 'Assets/images';
import Icon from 'Components/icon';
import { Colors } from 'Styles/colors';

const Avatar = ({ style, isSelected, color, uri }) => {
  if (isSelected) {
    return (
      <Icon
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
      source={{ uri }}
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
  isSelected: PropTypes.bool,
  uri: PropTypes.string,
};

export default memo(Avatar);
