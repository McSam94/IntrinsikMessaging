/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import AuthSrv from 'Services/auth';
import { RESPONSE_STATUS } from 'Utils/constants';
import { storeData, getData, removeData } from 'Utils/local-storage';

export const authAction = Object.freeze({
	INIT: createRequestAction('init'),
	LOGIN: createRequestAction('login'),
	LOGOUT: 'logout',
});

export const init = (dispatch) => {
	return useCallback(async () => {
		dispatch({
			type: authAction.INIT.REQUEST,
		});

		try {
			const [token, user] = await getData(['@token', '@user']);

			dispatch({
				type: authAction.INIT.SUCCESS,
				payload: {
					token,
					user,
				},
			});
		} catch (error) {
			dispatch({
				type: authAction.INIT.FAIL,
			});
		}
	}, [dispatch]);
};

export const login = (dispatch) => {
	return useCallback(
		async (param) => {
			dispatch({ type: authAction.LOGIN.REQUEST });

			try {
				const result = await AuthSrv.login(param);

				if (result.status === RESPONSE_STATUS.SUCCESS) {
					const { token, user } = result?.data;
					await storeData([
						['@token', token],
						['@user', user],
					]);
					dispatch({
						type: authAction.LOGIN.SUCCESS,
						payload: { token, user },
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
		removeData(['@user', '@token']);
	}, [dispatch]);
};
