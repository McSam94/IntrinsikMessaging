import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useThemeColor } from 'Stores/ui';
import * as SvgCollections from 'Assets/icons';

const Icon = ({
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
    <>
      {onClick ? (
        <TouchableOpacity style={[styles.container, style]} onPress={onClick}>
          <DynamicIcon
            fill={color}
            height={height ?? '100%'}
            width={width ?? '100%'}
            {...props}
          />
          {label && (
            <Text
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
      ) : (
        <View style={[styles.container, style]}>
          <DynamicIcon
            fill={color}
            height={height ?? '100%'}
            width={width ?? '100%'}
            {...props}
          />
          {label && (
            <Text
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
        </View>
      )}
    </>
  );
};

Icon.propTypes = {
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
