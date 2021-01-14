import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useThemeColor } from 'Stores/ui';
import { FontSize } from 'Styles/typography';
import { Colors } from 'Styles/colors';

const Loader = ({ style, size, message, color }) => {
  const { colorize } = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size={size ?? 'large'}
        color={color ?? Colors.primary}
      />
      {message && (
        <Text
          style={[
            styles.text,
            {
              color: colorize('textWashOut'),
            },
          ]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FontSize.L,
    marginTop: 26,
  },
});

Loader.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  size: PropTypes.oneOf(['large', 'small']),
  message: PropTypes.string,
  color: PropTypes.string,
};

export default memo(Loader);
