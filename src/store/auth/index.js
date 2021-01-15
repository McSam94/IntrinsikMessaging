import { useReducerContext } from 'Utils/hooks';
import { login, logout } from './auth-actions';
import { AuthReducer } from './auth-reducer';
import { getData } from 'Utils/local-storage';

const STORE_NAME = 'AuthStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
  reducer: AuthReducer,
  actions: {
    login,
    logout,
  },
  initialState: {
    isLoggingIn: false,
    isLoggedIn: false,
    token: getData('@token'),
    user: getData('@user'),
  },
  displayName: STORE_NAME,
});
