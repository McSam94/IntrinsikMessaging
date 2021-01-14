/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import ConversationSrv from 'Services/conversation';
import { RESPONSE_STATUS } from 'Utils/constants';

export const conversationAction = Object.freeze({
  CONVERSATION_LIST: createRequestAction('contact_list'),
});

export const getConversationList = (dispatch) => {
  return useCallback(
    async (userId) => {
      dispatch({ type: conversationAction.CONVERSATION_LIST.REQUEST });

      try {
        const result = await ConversationSrv.getList(userId);

        if (result?.status === RESPONSE_STATUS.SUCCESS) {
          dispatch({
            type: conversationAction.CONVERSATION_LIST.SUCCESS,
            payload: {
              conversationList: result?.data,
            },
          });
        } else {
          dispatch({
            type: conversationAction.CONVERSATION_LIST.FAIL,
            payload: { conversationErrorMsg: result?.message },
          });
        }
      } catch (error) {
        dispatch({
          type: conversationAction.CONVERSATION_LIST.FAIL,
          payload: { conversationErrorMsg: error?.data },
        });
      }
    },
    [dispatch],
  );
};
