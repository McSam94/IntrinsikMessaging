import { authAction } from './auth-actions';

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case authAction.LOGIN.REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case authAction.LOGIN.SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        token: action?.payload?.token,
        user: action?.payload.user,
      };
    case authAction.LOGIN.FAIL:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case authAction.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: '',
        user: {},
      };
    default:
      return {
        ...state,
      };
  }
};
