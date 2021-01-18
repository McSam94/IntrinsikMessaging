import { useCallback, useContext, useMemo } from 'react';
import { useColorScheme, I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { useReducerContext } from 'Utils/hooks';
import { Language } from 'Utils/constants';
import { init, updateTheme, updateLang } from './ui-actions';
import { UIReducer } from './ui-reducer';
import Themes from 'Styles/theme';
import { getName } from './ui-factory';

const STORE_NAME = 'UIStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { Context, Provider } = useReducerContext({
	reducer: UIReducer,
	actions: {
		init,
		updateTheme,
		updateLang,
	},
	initialState: {
		isInitializing: false,
		isInitialized: false,
		theme: 'system',
		lang: RNLocalize.getLocales()[0].languageTag,
	},
	displayName: STORE_NAME,
});

const useThemeColor = () => {
	const { theme } = useContext(Context);
	const systemTheme = useColorScheme();

	const appTheme = useMemo(
		() => (theme === 'system' ? systemTheme : theme) || 'system',
		[theme, systemTheme],
	);

	const colorize = useCallback((colorName) => Themes[appTheme][colorName], [
		appTheme,
	]);

	return { appTheme, colorize };
};

const useTranslation = () => {
	const { lang } = useContext(Context);

	const languageName = useMemo(() => getName(lang), [lang]);

	const translate = useCallback(
		(key, config = {}) => i18n.t(key, config),
		[],
	);

	const setTranslation = useCallback(
		(translationGetters) => {
			const preferences = Object.keys(translationGetters).some(
				(key) => key === lang,
			)
				? { languageTag: lang, isRTL: false }
				: undefined;
			const fallback = { languageTag: Language.english, isRTL: false };

			const { languageTag, isRTL } =
				preferences ||
				RNLocalize.findBestAvailableLanguage(
					Object.keys(translationGetters),
				) ||
				fallback;

			I18nManager.forceRTL(isRTL);
			i18n.translations = {
				[languageTag]: translationGetters[languageTag](),
			};
			i18n.locale = languageTag;
		},
		[lang],
	);

	return { translate, languageName, setTranslation };
};

export { Context, Provider, useThemeColor, useTranslation };
