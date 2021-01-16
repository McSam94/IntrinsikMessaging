import { chatAction } from './chat-actions';

export const ChatReducer = (state, action) => {
	switch (action.type) {
		case chatAction.CHAT_LIST.REQUEST:
			return {
				...state,
				isGettingList: true,
				chatErrorMsg: '',
			};
		case chatAction.CHAT_LIST.SUCCESS:
			return {
				...state,
				isGettingList: false,
				isGottenList: true,
				chatList: [...state.chatList, ...action?.payload?.chatList],
				chatPage: state.chatPage + 1,
				chatErrorMsg: '',
			};
		case chatAction.CHAT_LIST.FAIL:
			return {
				...state,
				isGettingList: false,
				isGottenList: false,
				chatErrorMsg: action?.payload?.chatErrorMsg,
			};
		default:
			return {
				...state,
			};
	}
};
