import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useThemeColor, useTranslation } from 'Stores/ui';
import Icon from 'Components/icon';
import Loader from 'Components/loader';
import { FontSize } from 'Styles/typography';

const List = ({
  style,
  data,
  isLoading,
  shouldShowSeperator,
  renderItem,
  onMoreData,
  error,
  emptyMsg,
  ...props
}) => {
  const { colorize } = useThemeColor();
  const { translate } = useTranslation();
  const { width } = useWindowDimensions();
  const footerComponent = useCallback(() => {
    if (isLoading && data.length) {
      return <ActivityIndicator />;
    }

    return null;
  }, [isLoading, data]);
  const seperatorComponent = useCallback(() => {
    if (shouldShowSeperator) {
      return (
        <View
          style={[
            styles.seperator,
            {
              borderColor: colorize('border'),
            },
          ]}
        />
      );
    }

    return null;
  }, [shouldShowSeperator, colorize]);

  if (isLoading && !data.length) {
    return <Loader message={translate('components.list.loading')} />;
  }

  return (
    <>
      {data.length ? (
        <FlatList
          style={[styles.list, style]}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, idx) => `${item?.id ?? ''}_${idx}`}
          ItemSeparatorComponent={seperatorComponent}
          onEndReachedThreshold={0.5}
          onEndReached={onMoreData}
          ListFooterComponent={footerComponent}
          {...props}
        />
      ) : (
        <View style={styles.placeholder}>
          <Icon
            name={error ? 'error' : 'empty'}
            style={{
              ...styles.placeholderImg,
              width,
            }}
          />
          <Text
            style={[
              styles.placeholderText,
              {
                color: colorize('textWashOut'),
              },
            ]}>
            {error ? translate('general.error') : emptyMsg}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {},
  seperator: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  placeholder: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    transform: [{ translateY: '-100%' }],
  },
  placeholderImg: {
    height: 250,
  },
  placeholderText: {
    fontSize: FontSize.XXL,
    textAlign: 'center',
    maxWidth: '80%',
  },
});

List.propTypes = {
  style: PropTypes.object,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  shouldShowSeperator: PropTypes.bool,
  renderItem: PropTypes.func,
  onMoreData: PropTypes.func,
  emptyMsg: PropTypes.string,
};

List.defaultProps = {
  shouldShowSeperator: true,
};

export default memo(List);
