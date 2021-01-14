import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { FontSize } from 'Styles/typography';
import Icon from 'Components/icon';
import { useThemeColor } from 'Stores/ui';
import { Colors } from 'Styles/colors';

const Header = ({ style, children, avatar, label, canBack, ...props }) => {
  const { goBack } = useNavigation();
  const { colorize } = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {canBack && (
          <Icon
            name="leftArrow"
            color={Colors.black}
            style={styles.icon}
            onClick={() => goBack()}
          />
        )}
        {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
        <Text
          style={[
            styles.text,
            {
              color: colorize('text'),
            },
            style,
          ]}
          {...props}>
          {label}
        </Text>
      </View>
      {children}
    </View>
  );
};

Header.propTypes = {
  style: PropTypes.string,
  children: PropTypes.node,
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
  avatar: {
    height: 25,
    width: 25,
  },
  text: {
    fontSize: FontSize.XXXL,
    fontWeight: 'bold',
    paddingHorizontal: 24,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Header;
