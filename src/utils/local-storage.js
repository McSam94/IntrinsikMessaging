import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  let transformedValue = value;
  try {
    if (typeof value === 'object') {
      transformedValue = JSON.stringify(value);
    }

    await AsyncStorage.setItem(key, transformedValue);
  } catch (e) {
    throw new Error(e);
  }
};

export const getData = async (key) => {
  let result = null;
  try {
    const value = await AsyncStorage.getItem(key);

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
