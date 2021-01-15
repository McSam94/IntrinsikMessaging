/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { createRequestAction } from 'Utils/common';
import ConversationSrv from 'Services/conversation';
import { RESPONSE_STATUS } from 'Utils/constants';

export const conversationAction = Object.freeze({
  CONVERSATION_LIST: createRequestAction('conversation_list'),
  NEW_CONVERSATION: createRequestAction('new_conversation'),
  SEND_MESSAGE: createRequestAction('send_message'),
  RESET_CONVERSATION: 'reset_conversation',
});

export const newConversation = (dispatch) => {
  return useCallback(
    async (contactIds) => {
      dispatch({ type: conversationAction.NEW_CONVERSATION.REQUEST });

      try {
        const result = await ConversationSrv.newConversation(
          contactIds.length > 1,
        );

        if (result?.status === RESPONSE_STATUS.SUCCESS) {
          dispatch({
            type: conversationAction.NEW_CONVERSATION.SUCCESS,
            payload: {
              conversationId: result?.data?.id,
              conversationTitle: result?.data?.title,
              conversationAvatar: result?.data?.avatar,
            },
          });
        } else {
          dispatch({
            type: conversationAction.NEW_CONVERSATION.FAIL,
            payload: { conversationErrorMsg: result?.message },
          });
        }
      } catch (error) {
        dispatch({
          type: conversationAction.NEW_CONVERSATION.FAIL,
          payload: { conversationErrorMsg: error?.data },
        });
      }
    },
    [dispatch],
  );
};

export const getConversation = (dispatch) => {
  return useCallback(
    async (conversationId, conversationPage) => {
      dispatch({ type: conversationAction.CONVERSATION_LIST.REQUEST });

      try {
        const result = await ConversationSrv.getList(
          conversationId,
          conversationPage,
        );

        if (result?.status === RESPONSE_STATUS.SUCCESS) {
          dispatch({
            type: conversationAction.CONVERSATION_LIST.SUCCESS,
            payload: {
              // conversationTitle: result?.data?.title,
              // conversationAvatar: result?.data?.avatar,
              conversationList: result?.data?.messages,
              isGroupConversation: result?.data?.isGroup,
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

export const sendMessage = (dispatch) => {
  return useCallback(
    async ({ message, image, file }) => {
      dispatch({ type: conversationAction.SEND_MESSAGE.REQUEST });

      try {
        const result = await ConversationSrv.sendMessage({
          message,
          image,
          file,
        });

        if (result?.status === RESPONSE_STATUS.SUCCESS) {
          dispatch({
            type: conversationAction.SEND_MESSAGE.SUCCESS,
            payload: {
              newConversation: result?.data,
            },
          });
        } else {
          dispatch({
            type: conversationAction.SEND_MESSAGE.FAIL,
            payload: { conversationErrorMsg: result?.message },
          });
        }
      } catch (error) {
        dispatch({
          type: conversationAction.SEND_MESSAGE.FAIL,
          payload: { conversationErrorMsg: error?.data },
        });
      }
    },
    [dispatch],
  );
};

export const resetConversation = (dispatch) => {
  return useCallback(async () => {
    dispatch({ type: conversationAction.RESET_CONVERSATION });
  }, [dispatch]);
};
