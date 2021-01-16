/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';

export const uiAction = Object.freeze({
	UPDATE_THEME: 'updateTheme',
	UPDATE_LANG: 'updateLang',
});

export const updateTheme = (dispatch) => {
	return useCallback(
		(theme) => {
			dispatch({ type: uiAction.UPDATE_THEME, payload: { theme } });
		},
		[dispatch],
	);
};

export const updateLang = (dispatch) => {
	return useCallback(
		(lang) => {
			dispatch({ type: uiAction.UPDATE_LANG, payload: { lang } });
		},
		[dispatch],
	);
};
