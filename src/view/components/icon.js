import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useThemeColor } from 'Stores/ui';
import * as SvgCollections from 'Assets/icons';

const Icon = ({
  testID,
  name,
  color,
  style,
  width,
  height,
  label,
  labelStyle,
  onClick,
  ...props
}) => {
  const { colorize } = useThemeColor();
  const DynamicIcon = SvgCollections[name];

  return (
    <TouchableOpacity
      testID={testID ?? 'icon'}
      style={[styles.container, style]}
      disabled={typeof onClick !== 'function'}
      onPress={onClick}>
      <DynamicIcon
        testID={testID ? `${testID}-icon` : 'icon-svg'}
        fill={color}
        height={height ?? '100%'}
        width={width ?? '100%'}
        {...props}
      />
      {label && (
        <Text
          testID={testID ? `${testID}-label` : 'icon-label'}
          style={[
            styles.label,
            {
              color: colorize('text'),
            },
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

Icon.propTypes = {
  testID: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    height: 50,
    width: 50,
    flexDirection: 'column',
  },
  label: {
    textAlign: 'center',
    marginTop: 12,
  },
});

export default memo(Icon);
