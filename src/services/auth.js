// import { post } from './base';
import { FAKE_TOKEN } from '@env';
import { API_DELAY } from 'Utils/constants';

const fakeLoginResponse = {
	token: FAKE_TOKEN,
	user: {
		name: 'McSam',
	},
};

const AuthSrv = {
	login: ({ username, password }) => {
		if (username && password) {
			// return post('/q', {
			// 	data: fakeLoginResponse,
			// });
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						status: 200,
						data: fakeLoginResponse,
					});
				}, API_DELAY);
			});
		} else {
			return Promise.reject();
		}
	},
};

export default AuthSrv;
