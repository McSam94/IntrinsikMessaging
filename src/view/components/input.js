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
import CONSTANT from 'Styles/constant';

const Input = forwardRef(
	(
		{
			testID,
			style,
			inputStyle,
			label,
			onChangeText,
			value,
			error,
			underline,
			shouldAnimate,
			...props
		},
		ref,
	) => {
		const { colorize } = useThemeColor();
		const shouldTop = useRef(new Animated.Value(value ? 1 : 0)).current;
		const [inputValue, setInputValue] = useState(value ?? '');
		const [isFocused, setIsFocused] = useState(false);

		useEffect(() => {
			Animated.timing(shouldTop, {
				toValue: !!inputValue || isFocused ? 1 : 0,
				duration: CONSTANT.INPUT.ANIMATION_DURATION,
				useNativeDriver: false,
			}).start();
		}, [inputValue, isFocused, shouldTop]);

		useEffect(() => {
			setInputValue(value);
		}, [value]);

		const animatedLabelTop = shouldTop.interpolate({
			inputRange: [0, 1],
			outputRange: [
				CONSTANT.INPUT.HEIGHT / 3,
				(CONSTANT.INPUT.HEIGHT / 6) * -1,
			],
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
				if (onChangeText) {
					onChangeText(text);
				}
			},
			[onChangeText],
		);

		const onFocus = useCallback((isFocus) => {
			setIsFocused(isFocus);
		}, []);

		return (
			<View
				ref={ref}
				testID={testID ?? 'input'}
				style={[
					styles.container,
					underline
						? {
								...styles.underlineContainer,
								borderBottomColor:
									isFocused || !!inputValue
										? Colors.primary
										: colorize('border'),
						  }
						: {},
					error ? styles.errorContainer : {},
					style,
				]}>
				{shouldAnimate && (
					<Animated.Text
						testID={testID ? `${testID}-label` : 'input-label'}
						style={[
							styles.label,
							// eslint-disable-next-line react-native/no-inline-styles
							{
								color: error
									? Colors.error
									: isFocused || !!inputValue
									? Colors.primary
									: colorize('placeholder'),
								backgroundColor:
									isFocused || inputValue
										? colorize('background')
										: 'transparent',
							},
							shouldAnimate
								? {
										top: animatedLabelTop,
										fontSize: animatedLabelFontSize,
										zIndex: shouldTop,
								  }
								: {},
						]}>
						{label}
					</Animated.Text>
				)}
				<TextInput
					testID={testID ? `${testID}-field` : 'input-field'}
					style={[
						styles.input,
						{
							color: colorize('text'),
						},
						inputStyle,
					]}
					onChangeText={onChange}
					value={inputValue}
					onFocus={() => onFocus(true)}
					onBlur={() => onFocus(false)}
					{...props}
				/>
				{error && (
					<Text
						testID={testID ? `${testID}-error` : 'input-error'}
						style={styles.error}>
						{error}
					</Text>
				)}
			</View>
		);
	},
);

Input.propTypes = {
	testID: PropTypes.string,
	style: PropTypes.object,
	inputStyle: PropTypes.object,
	label: PropTypes.string,
	onChangeText: PropTypes.func,
	value: PropTypes.string,
	error: PropTypes.string,
	underline: PropTypes.bool,
	shouldAnimate: PropTypes.bool,
};

Input.defaultProps = {
	underline: false,
	shouldAnimate: false,
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
		height: CONSTANT.INPUT.HEIGHT,
	},
	underlineContainer: {
		borderBottomWidth: 1,
	},
	errorContainer: {
		borderBottomColor: Colors.error,
	},
	label: {
		fontSize: 12,
		position: 'absolute',
	},
	input: {},
	error: {
		color: Colors.error,
		marginTop: 8,
	},
});

export default memo(Input);
export { ControlledInput };
