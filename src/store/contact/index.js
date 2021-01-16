import { useReducerContext } from 'Utils/hooks';
import { getContactList } from './contact-actions';
import { ContactReducer } from './contact-reducer';
import { transformContact } from './contact-factory';

const STORE_NAME = 'ContactStore';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const { Context, Provider } = useReducerContext({
	reducer: ContactReducer,
	actions: {
		getContactList,
	},
	initialState: {
		isGettingList: false,
		isGottenList: false,
		contactList: [],
		contactErrorMsg: '',
	},
	displayName: STORE_NAME,
});

export { transformContact };
