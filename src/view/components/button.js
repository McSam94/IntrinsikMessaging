import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useThemeColor } from 'Stores/ui';
import { Colors, Shadow } from 'Styles/colors';

const Button = ({ style, isLink, label, onClick, ...props }) => {
  const { colorize } = useThemeColor();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isLink ? colorize('background') : Colors.primary,
        },
        !isLink ? styles.primaryButton : {},
        style,
      ]}
      onPress={onClick}
      {...props}>
      <Text
        style={[
          styles.label,
          {
            color: isLink ? Colors.primary : Colors.white,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 12,
    ...Shadow,
  },
  label: {},
});

export default Button;
