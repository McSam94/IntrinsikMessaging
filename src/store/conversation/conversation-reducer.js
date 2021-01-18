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
				conversationTitle: action?.payload?.conversationTitle,
				conversationAvatar: action?.payload?.conversationAvatar,
				isGroupConversation: action?.payload?.isGroupConversation,
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
		case conversationAction.NEW_CONVERSATION.REQUEST:
			return {
				...state,
				isCreating: true,
				isCreated: false,
				conversationErrorMsg: '',
				conversationList: [],
			};
		case conversationAction.NEW_CONVERSATION.SUCCESS:
			return {
				...state,
				isCreating: false,
				isCreated: true,
				isGottenList: true,
				conversationId: action?.payload?.conversationId,
				conversationTitle: action?.payload?.conversationTitle,
				conversationAvatar: action?.payload?.conversationAvatar,
				isGroupConversation: action?.payload?.isGroupConversation,
			};
		case conversationAction.NEW_CONVERSATION.FAIL:
			return {
				...state,
				isCreating: false,
				isCreated: false,
				conversationErrorMsg: action?.payload?.conversationErrorMsg,
			};
		case conversationAction.RESET_CONVERSATION:
			return {
				...state,
				isCreated: false,
				isGottenList: false,
				conversationId: '',
				conversationTitle: '',
				conversattionAvatar: '',
				conversationList: [],
				conversationPage: 1,
			};
		case conversationAction.SEND_MESSAGE.REQUEST:
			return {
				...state,
				isSending: true,
				isSent: false,
			};
		case conversationAction.SEND_MESSAGE.SUCCESS:
			return {
				...state,
				isSending: false,
				isSent: true,
				conversationList: [
					action?.payload?.newConversation,
					...state.conversationList,
				],
			};
		case conversationAction.SEND_MESSAGE.FAIL:
			return {
				...state,
				isSending: false,
				isSent: false,
			};
		default:
			return {
				...state,
			};
	}
};
