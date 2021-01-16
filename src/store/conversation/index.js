import { useReducerContext } from 'Utils/hooks';
import {
	newConversation,
	getConversation,
	resetConversation,
	sendMessage,
} from './conversation-actions';
import { ConversationReducer } from './conversation-reducer';

const STORE_NAME = 'ConversationStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
	reducer: ConversationReducer,
	actions: {
		newConversation,
		getConversation,
		resetConversation,
		sendMessage,
	},
	initialState: {
		isGettingList: false,
		isGottenList: false,
		isCreating: false,
		isCreated: false,
		isGroupConversation: false,
		isSending: false,
		isSent: false,
		conversationId: '',
		conversationTitle: '',
		conversationAvatar: '',
		conversationList: [],
		conversationPage: 1,
		conversationErrorMsg: '',
	},
	displayName: STORE_NAME,
});
