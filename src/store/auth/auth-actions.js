/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import AuthSrv from 'Services/auth';
import { RESPONSE_STATUS } from 'Utils/constants';
import { storeData } from 'Utils/local-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
			const result = await AsyncStorage.multiGet(['@token', '@user']);

			const [[, token], [, user]] = result;
			dispatch({
				type: authAction.INIT.SUCCESS,
				payload: {
					token,
					user: JSON.parse(user),
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
					storeData('@token', token);
					storeData('@user', user);
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
	}, [dispatch]);
};
