import { useReducerContext } from 'Utils/hooks';
import { getChatList } from './chat-actions';
import { ChatReducer } from './chat-reducer';

const STORE_NAME = 'ChatStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
	reducer: ChatReducer,
	actions: {
		getChatList,
	},
	initialState: {
		isGettingList: false,
		isGottenList: false,
		chatList: [],
		chatPage: 1,
		chatErrorMsg: '',
	},
	displayName: STORE_NAME,
});
