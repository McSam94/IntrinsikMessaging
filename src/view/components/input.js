import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  forwardRef,
  memo,
} from 'react';
import { StyleSheet, Animated, TextInput, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeColor } from 'Stores/ui';
import { Colors } from 'Styles/colors';
import { Controller } from 'react-hook-form';

const ANIMATION_DURATION = 300;

const Input = forwardRef(
  ({ style, name, label, onChangeText, value, error, ...props }, ref) => {
    const { colorize } = useThemeColor();
    const shouldTop = useRef(new Animated.Value(value ? 1 : 0)).current;
    const [inputValue, setInputValue] = useState(value ?? '');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
      Animated.timing(shouldTop, {
        toValue: !!inputValue || isFocused ? 1 : 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    }, [inputValue, isFocused, shouldTop]);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const animatedLabelTop = shouldTop.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -8],
      extrapolate: 'clamp',
    });

    const animatedLabelFontSize = shouldTop.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 13],
      extrapolate: 'clamp',
    });

    const onChange = useCallback(
      (text) => {
        setInputValue(text);
        if (onChangeText) onChangeText(text);
      },
      [onChangeText],
    );

    const onFocus = useCallback((isFocus) => {
      setIsFocused(isFocus);
    }, []);

    return (
      <View
        ref={ref}
        style={[
          styles.container,
          {
            borderBottomColor: colorize('border'),
          },
          error ? styles.errorContainer : {},
          style,
        ]}>
        <Animated.Text
          style={[
            styles.label,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              color: error
                ? Colors.error
                : isFocused
                ? Colors.primary
                : colorize('placeholder'),
              backgroundColor:
                isFocused || inputValue
                  ? colorize('background')
                  : 'transparent',
              top: animatedLabelTop,
              fontSize: animatedLabelFontSize,
              zIndex: shouldTop,
            },
          ]}>
          {label}
        </Animated.Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={inputValue}
          onFocus={() => onFocus(true)}
          onBlur={() => onFocus(false)}
          {...props}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

Input.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
};

const ControlledInput = memo(
  ({ name, control, defaultValue, rules, ...props }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ onChange, value }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
        defaultValue={defaultValue ?? ''}
        rules={rules}
      />
    );
  },
);

ControlledInput.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  defaultValue: PropTypes.string,
  rules: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    borderBottomWidth: 1,
    marginTop: 12,
  },
  errorContainer: {
    borderBottomColor: Colors.error,
  },
  label: {
    fontSize: 12,
  },
  input: {},
  error: {
    color: Colors.error,
    marginTop: 8,
  },
});

export default memo(Input);
export { ControlledInput };
