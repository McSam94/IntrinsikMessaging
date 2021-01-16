import { contactAction } from './contact-actions';

export const ContactReducer = (state, action) => {
	switch (action.type) {
		case contactAction.CONTACT_LIST.REQUEST:
			return {
				...state,
				isGettingList: true,
				contactErrorMsg: '',
			};
		case contactAction.CONTACT_LIST.SUCCESS:
			return {
				...state,
				isGettingList: false,
				isGottenList: true,
				contactList: [
					...state.contactList,
					...action?.payload?.contactList,
				],
				contactErrorMsg: '',
			};
		case contactAction.CONTACT_LIST.FAIL:
			return {
				...state,
				isGettingList: false,
				isGottenList: false,
				contactErrorMsg: action?.payload?.contactErrorMsg,
			};
		default:
			return {
				...state,
			};
	}
};
