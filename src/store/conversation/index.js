import { useReducerContext } from 'Utils/hooks';
import { getConversationList } from './conversation-actions';
import { ConversationReducer } from './conversation-reducer';

const STORE_NAME = 'ConversationStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
  reducer: ConversationReducer,
  actions: {
    getConversationList,
  },
  initialState: {
    isGettingList: false,
    isGottenList: false,
    conversationList: [],
    conversationPage: 1,
    conversationErrorMsg: '',
  },
  displayName: STORE_NAME,
});
