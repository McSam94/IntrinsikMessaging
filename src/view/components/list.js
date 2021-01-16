import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
	Animated,
} from 'react-native';
import { useThemeColor, useTranslation } from 'Stores/ui';
import Icon from 'Components/icon';
import Loader from 'Components/loader';
import { FontSize } from 'Styles/typography';
import CONSTANT from 'Styles/constant';

const List = ({
	testID,
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

	if (isLoading) {
		return (
			<Loader
				testID="list-loading"
				message={translate('components.list.loading')}
			/>
		);
	}

	return (
		<>
			{data.length ? (
				<FlatList
					testID={testID ?? 'list'}
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
				<Animated.View
					style={styles.placeholder}
					testID={testID ? `${testID}-status` : 'list-status'}>
					<Icon
						testID={testID ? `${testID}-image` : 'list-image'}
						name={error ? 'errorStatus' : 'emptyStatus'}
						style={{
							...styles.placeholderImg,
							width,
						}}
					/>
					<Text
						testID={testID ? `${testID}-message` : 'list-message'}
						style={[
							styles.placeholderText,
							{
								color: colorize('textWashOut'),
							},
						]}>
						{error
							? /*translate('general.error')*/ error
							: emptyMsg}
					</Text>
				</Animated.View>
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
		transform: [
			{ translateY: (CONSTANT.LIST.PLACEHOLDER_HEIGHT / 2) * -1 },
		],
	},
	placeholderImg: {
		height: CONSTANT.LIST.PLACEHOLDER_HEIGHT,
	},
	placeholderText: {
		fontSize: FontSize.XXL,
		textAlign: 'center',
		maxWidth: '80%',
	},
});

List.propTypes = {
	testID: PropTypes.string,
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
