export const createRequestAction = (action) => {
  return {
    REQUEST: `${action}_request`,
    SUCCESS: `${action}_success`,
    FAIL: `${action}_fail`,
  };
};

export const getSurName = (name) => {
  return name?.split(' ')?.[0] ?? name;
};

export const getGroupName = (contactList) => {
  return contactList.reduce((accValue, contact, idx) => {
    let naming = accValue;
    naming += `${getSurName(contact?.name ?? '')}`;
    if (idx !== contactList.length - 1) {
      naming += ',';
    }

    return naming;
  }, '');
};
