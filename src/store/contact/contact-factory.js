export const transformContact = (contactList) => {
	if (!contactList.length) {
		return [];
	}

	const transformedContactList = contactList.reduce((accList, contact) => {
		const prefixChar = contact?.name[0]?.toUpperCase() ?? 'A';
		let frontList = {};
		let backList = {};

		Object.keys(accList).forEach((key) => {
			if (key < prefixChar) {
				frontList = { ...frontList, [key]: accList[key] };
			}
			if (key > prefixChar) {
				backList = { ...backList, [key]: accList[key] };
			}
		});
		const newAccList = {
			...frontList,
			[prefixChar]: [...(accList?.[prefixChar] ?? []), contact],
			...backList,
		};

		return newAccList;
	}, {});

	return transformedContactList;
};
