import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as SvgCollections from 'Assets/icons';

const Icon = ({ name, color, style, onClick, ...props }) => {
  const DynamicIcon = SvgCollections[name];

  return (
    <>
      {onClick ? (
        <TouchableOpacity style={[styles.container, style]} onPress={onClick}>
          <DynamicIcon fill={color} height="100%" width="100%" {...props} />
        </TouchableOpacity>
      ) : (
        <View style={[styles.container, style]}>
          <DynamicIcon fill={color} height="100%" width="100%" {...props} />
        </View>
      )}
    </>
  );
};

Icon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  color: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    height: 50,
    width: 50,
  },
});

export default Icon;
