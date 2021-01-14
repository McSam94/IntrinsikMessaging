/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import ChatSrv from 'Services/chat';
import { RESPONSE_STATUS } from 'Utils/constants';

export const chatAction = Object.freeze({
  CHAT_LIST: createRequestAction('chat_list'),
});

export const getChatList = (dispatch) => {
  return useCallback(async () => {
    dispatch({ type: chatAction.CHAT_LIST.REQUEST });

    try {
      const result = await ChatSrv.getList();

      if (result?.status === RESPONSE_STATUS.SUCCESS) {
        dispatch({
          type: chatAction.CHAT_LIST.SUCCESS,
          payload: {
            chatList: result?.data,
          },
        });
      } else {
        dispatch({
          type: chatAction.CHAT_LIST.FAIL,
          payload: { chatErrorMsg: result?.message },
        });
      }
    } catch (error) {
      dispatch({
        type: chatAction.CHAT_LIST.FAIL,
        payload: { chatErrorMsg: error?.data },
      });
    }
  }, [dispatch]);
};
