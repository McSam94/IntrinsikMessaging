import AsyncStorage from '@react-native-async-storage/async-storage';
import { isJSON } from './common';

export const storeData = async (key, value = null) => {
	try {
		if (Array.isArray(key) && !value) {
			const dataToStore = key.map(([k, v]) => {
				if (typeof v === 'object') {
					return [k, JSON.stringify(v)];
				} else {
					return [k, v];
				}
			});

			await AsyncStorage.multiSet(dataToStore);
		} else {
			await AsyncStorage.setItem(
				key,
				typeof value === 'object' ? JSON.stringify(value) : value,
			);
		}
	} catch (e) {
		throw new Error(e);
	}
};

export const getData = async (key) => {
	if (Array.isArray(key)) {
		const result = await AsyncStorage.multiGet(key);

		return result.map(([k, v]) => {
			return isJSON(v) ? JSON.parse(v) : v;
		});
	} else {
		let result = null;
		try {
			const value = await AsyncStorage.getItem(key);

			if (value) {
				result = isJSON(value) ? JSON.parse(value) : value;
			}

			return result;
		} catch (e) {
			throw new Error(e);
		}
	}
};

export const removeData = async (key) => {
	if (Array.isArray(key)) {
		await AsyncStorage.multiRemove(key);
	} else {
		await AsyncStorage.removeItem(key);
	}
};
