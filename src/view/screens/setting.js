import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Layout from 'Components/layout';
import Header from 'Components/header';
import ListItem from 'Components/listItem';
import Icon from 'Components/icon';
import { useTranslation, useThemeColor } from 'Stores/ui';
import { UiContext, AuthContext } from 'Stores';
import { StyleSheet } from 'react-native';

const THEME = ['dark', 'light'];
const LANG = ['en', 'zh'];

const Setting = () => {
	const { canGoBack, goBack } = useNavigation();
	const { appTheme, colorize } = useThemeColor();
	const { translate, languageName } = useTranslation();
	const { updateTheme, updateLang, lang, theme } = useContext(UiContext);
	const { logout } = useContext(AuthContext);

	const updateThemeFn = useCallback(async () => {
		const newThemeIndex =
			THEME.indexOf(theme) === THEME.length - 1
				? 0
				: THEME.indexOf(theme) + 1;

		updateTheme(THEME[newThemeIndex]);
	}, [updateTheme, theme]);

	const updateLangFn = useCallback(async () => {
		const newLangIndex =
			LANG.indexOf(lang) === LANG.length - 1 ? 0 : LANG.indexOf(lang) + 1;

		updateLang(LANG[newLangIndex]);
	}, [updateLang, lang]);

	const navigateBack = useCallback(() => {
		if (canGoBack) {
			goBack();
		}
	}, [canGoBack, goBack]);

	const getIcon = useMemo(() => {
		switch (appTheme) {
			case 'system':
				return 'smartphone';
			case 'dark':
				return 'moon';
			case 'light':
				return 'sun';
			default:
				return 'system';
		}
	}, [appTheme]);

	return (
		<Layout>
			<Header
				label={translate('screens.setting.title')}
				navigate={navigateBack}
			/>
			<ListItem
				style={{
					...styles.item,
					borderBottomColor: colorize('border'),
				}}
				icon={
					<Icon
						name={getIcon}
						color={colorize('text')}
						style={styles.icon}
					/>
				}
				title={translate('screens.setting.dark')}
				description={appTheme}
				onClick={updateThemeFn}
			/>
			<ListItem
				style={{
					...styles.item,
					borderBottomColor: colorize('border'),
				}}
				icon={
					<Icon
						name="earth"
						color={colorize('text')}
						style={styles.icon}
					/>
				}
				title={translate('screens.setting.lang')}
				description={languageName}
				onClick={updateLangFn}
			/>
			<ListItem
				style={{
					...styles.item,
					borderBottomColor: colorize('border'),
				}}
				icon={
					<Icon
						name="logout"
						color={colorize('text')}
						style={styles.icon}
					/>
				}
				title={translate('screens.setting.logout')}
				onClick={logout}
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	icon: {
		height: 40,
		width: 40,
	},
	item: {
		paddingHorizontal: 24,
		borderBottomWidth: 1,
	},
});

export default Setting;
