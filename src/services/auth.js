import { post } from './base';
import { FAKE_TOKEN } from '@env';

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
			//   data: {
			//     token: FAKE_TOKEN,
			//   },
			// });
			return Promise.resolve({
				status: 200,
				data: fakeLoginResponse,
			});
		} else {
			return Promise.reject();
		}
	},
};

export default AuthSrv;
