import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { FontSize } from 'Styles/typography';
import Icon from 'Components/icon';
import Avatar from 'Components/avatar';
import { useThemeColor } from 'Stores/ui';

const Header = ({
  testID,
  style,
  children,
  avatar,
  label,
  navigate,
  ...props
}) => {
  const { colorize } = useThemeColor();

  return (
    <View testID={testID ?? 'header-container'} style={styles.container}>
      <View style={styles.titleContainer}>
        {navigate && (
          <Icon
            testID="header-navigate"
            name="leftArrow"
            color={colorize('text')}
            style={styles.icon}
            onClick={navigate}
          />
        )}
        <View style={styles.headerContent}>
          {avatar}
          <Text
            testID="header-title"
            style={[
              styles.text,
              {
                color: colorize('text'),
              },
              style,
            ]}
            numberOfLines={1}
            {...props}>
            {label}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};

Header.propTypes = {
  testID: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  avatar: PropTypes.node,
  label: PropTypes.string,
  navigate: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 12,
    maxWidth: 250,
  },
  avatar: {
    height: 40,
    width: 40,
  },
  text: {
    fontSize: FontSize.XXXL,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Header;
