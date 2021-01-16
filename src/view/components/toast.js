import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeColor } from 'Stores/ui';
import { Colors, Shadow } from 'Styles/colors';
import { FontSize } from 'Styles/typography';
import Icon from 'Components/icon';

const Toast = ({ type, text }) => {
  const { colorize } = useThemeColor();
  const getColor = useMemo(() => {
    switch (type) {
      case 'info':
        return Colors.info;
      case 'error':
        return Colors.error;
      case 'success':
        return Colors.secondary;
      default:
        return Colors.primary;
    }
  }, [type]);

  return (
    <View
      style={[
        styles.toastContainer,
        {
          backgroundColor: getColor,
        },
      ]}>
      <Icon name={type} style={styles.icon} color={Colors.white} />
      <Text style={styles.toastText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '80%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow,
  },
  icon: {
    height: 25,
    width: 25,
  },
  toastText: {
    fontSize: FontSize.XL,
    marginStart: 12,
    color: Colors.white,
  },
});

Toast.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'error']),
  text: PropTypes.string,
};

export default memo(Toast);
