import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'Components/icon';
import { Colors, Shadow } from 'Styles/colors';

const Floating = ({ icon, onClick, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.button,
        {
          bottom: 12 + insets.bottom,
        },
        style,
      ]}>
      <Icon name={icon} style={styles.icon} color={Colors.white} />
    </TouchableOpacity>
  );
};

Floating.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    height: 60,
    width: 60,
    right: 24,
    zIndex: 99,
    backgroundColor: Colors.primary,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow,
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default memo(Floating);
