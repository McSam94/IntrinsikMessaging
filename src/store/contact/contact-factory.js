export const transformContact = (contactList) => {
  if (!contactList.length) return [];

  const transformedContactList = contactList.reduce((accList, contact) => {
    const prefixChar = contact?.name[0]?.toUpperCase() ?? 'A';

    const newAccList = {
      ...accList,
      [prefixChar]: [...(accList?.[prefixChar] ?? []), contact],
    };

    return newAccList;
  }, {});

  return transformedContactList;
};
