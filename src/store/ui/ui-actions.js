/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import { getData, storeData } from 'Utils/local-storage';

export const uiAction = Object.freeze({
	INIT: createRequestAction('init'),
	UPDATE_THEME: 'updateTheme',
	UPDATE_LANG: 'updateLang',
});

export const init = (dispatch) => {
	return useCallback(async () => {
		dispatch({ type: uiAction.INIT.REQUEST });

		try {
			const [theme, lang] = await getData(['@theme', '@lang']);

			dispatch({
				type: uiAction.INIT.SUCCESS,
				payload: {
					theme,
					lang,
				},
			});
		} catch (error) {
			dispatch({ type: uiAction.INIT.FAIL });
		}
	}, [dispatch]);
};

export const updateTheme = (dispatch) => {
	return useCallback(
		async (theme) => {
			dispatch({ type: uiAction.UPDATE_THEME, payload: { theme } });
			await storeData('@theme', theme);
		},
		[dispatch],
	);
};

export const updateLang = (dispatch) => {
	return useCallback(
		async (lang) => {
			dispatch({ type: uiAction.UPDATE_LANG, payload: { lang } });
			await storeData('@lang', lang);
		},
		[dispatch],
	);
};
