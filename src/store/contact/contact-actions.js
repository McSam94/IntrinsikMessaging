/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import ContactSrv from 'Services/contact';
import { RESPONSE_STATUS } from 'Utils/constants';

export const contactAction = Object.freeze({
	CONTACT_LIST: createRequestAction('contact_list'),
});

export const getContactList = (dispatch) => {
	return useCallback(async () => {
		dispatch({ type: contactAction.CONTACT_LIST.REQUEST });

		try {
			const result = await ContactSrv.getList();

			if (result?.status === RESPONSE_STATUS.SUCCESS) {
				dispatch({
					type: contactAction.CONTACT_LIST.SUCCESS,
					payload: {
						contactList: result?.data,
					},
				});
			} else {
				dispatch({
					type: contactAction.CONTACT_LIST.FAIL,
					payload: { contactErrorMsg: result?.message },
				});
			}
		} catch (error) {
			dispatch({
				type: contactAction.CONTACT_LIST.FAIL,
				payload: { contactErrorMsg: error?.data },
			});
		}
	}, [dispatch]);
};
