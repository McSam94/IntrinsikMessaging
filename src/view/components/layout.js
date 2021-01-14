import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import StatusBar from 'Components/statusBar';
import { useThemeColor } from 'Stores/ui';
import { Colors } from 'Styles/colors';

const Layout = ({ statusBarColor, barStyle, children }) => {
  const { colorize } = useThemeColor();

  return (
    <>
      <StatusBar
        backgroundColor={statusBarColor ?? Colors.white}
        barStyle={barStyle ?? 'dark-content'}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colorize('background'),
          },
        ]}>
        {children}
      </View>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  statusBarColor: PropTypes.string,
  barStyle: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {},
  listItem: {
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  placeholder: {
    width: '100%',
    height: '100%',
  },
});

export default memo(Layout);
