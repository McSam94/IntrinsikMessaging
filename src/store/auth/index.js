import { useReducerContext } from 'Utils/hooks';
import { login, logout, init } from './auth-actions';
import { AuthReducer } from './auth-reducer';

const STORE_NAME = 'AuthStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
  reducer: AuthReducer,
  actions: {
    init,
    login,
    logout,
  },
  initialState: {
    isInitializing: false,
    isInitialized: false,
    isLoggingIn: false,
    isLoggedIn: false,
    token: '',
    user: '',
  },
  displayName: STORE_NAME,
});
