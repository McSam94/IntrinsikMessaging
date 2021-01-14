import { uiAction } from './ui-actions';

export const UIReducer = (state, action) => {
  switch (action.type) {
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
