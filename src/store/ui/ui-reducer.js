import { uiAction } from './ui-actions';

export const UIReducer = (state, action) => {
	switch (action.type) {
		case uiAction.INIT.REQUEST:
			return {
				...state,
				isInitializing: true,
			};
		case uiAction.INIT.SUCCESS:
			return {
				...state,
				isInitializing: false,
				isInitialized: true,
				theme: action?.payload?.theme,
				lang: action?.payload?.lang,
			};
		case uiAction.INIT.FAIL:
			return {
				...state,
				isInitalizing: false,
				isInitialized: false,
			};
		case uiAction.UPDATE_THEME:
			return {
				...state,
				theme: action?.payload?.theme,
			};
		case uiAction.UPDATE_LANG:
			return {
				...state,
				lang: action?.payload?.lang,
			};
		default:
			return state;
	}
};
