import SyncStorage from 'sync-storage';

export const storeData = (key, value) => {
  let transformedValue = value;
  try {
    if (typeof value === 'object') {
      transformedValue = JSON.stringify(value);
    }

    SyncStorage.set(key, transformedValue);
  } catch (e) {
    throw new Error(e);
  }
};

export const getData = (key) => {
  let result = null;
  try {
    const value = SyncStorage.get(key);

    if (value) {
      try {
        result = JSON.parse(value);
      } catch (e) {
        result = value;
      }
    }

    return result;
  } catch (e) {
    throw new Error(e);
  }
};
