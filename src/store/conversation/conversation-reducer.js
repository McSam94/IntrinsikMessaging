import { conversationAction } from './conversation-actions';

export const ConversationReducer = (state, action) => {
  switch (action.type) {
    case conversationAction.CONVERSATION_LIST.REQUEST:
      return {
        ...state,
        isGettingList: true,
        conversationErrorMsg: '',
      };
    case conversationAction.CONVERSATION_LIST.SUCCESS:
      return {
        ...state,
        isGettingList: false,
        isGottenList: true,
        conversationList: [
          ...state.conversationList,
          ...action?.payload?.conversationList,
        ],
        conversationPage: state.conversationPage + 1,
        conversationErrorMsg: '',
      };
    case conversationAction.CONVERSATION_LIST.FAIL:
      return {
        ...state,
        isGettingList: false,
        isGottenList: false,
        conversationErrorMsg: action?.payload?.conversationErrorMsg,
      };
    default:
      return {
        ...state,
      };
  }
};
