/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import AuthSrv from 'Services/auth';
import { RESPONSE_STATUS } from 'Utils/constants';
import { storeData } from 'Utils/local-storage';

export const authAction = Object.freeze({
  LOGIN: createRequestAction('login'),
  LOGOUT: 'logout',
});

export const login = (dispatch) => {
  return useCallback(
    async (param) => {
      dispatch({ type: authAction.LOGIN.REQUEST });

      try {
        const result = await AuthSrv.login(param);

        if (result.status === RESPONSE_STATUS.SUCCESS) {
          const { token } = result?.data;
          storeData('access_token', token);
          dispatch({
            type: authAction.LOGIN.SUCCESS,
            payload: { token },
          });
        } else {
          dispatch({
            type: authAction.LOGIN.FAIL,
            payload: { loginErrorMsg: result?.message },
          });
        }
      } catch (error) {
        dispatch({
          type: authAction.LOGIN.FAIL,
          payload: { loginErrorMsg: error },
        });
      }
    },
    [dispatch],
  );
};

export const logout = (dispatch) => {
  return useCallback(() => {
    dispatch({ type: authAction.LOGOUT });
  }, [dispatch]);
};
