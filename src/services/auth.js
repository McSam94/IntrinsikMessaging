import { post } from './base';
import { FAKE_TOKEN } from '@env';

const AuthSrv = {
  login: ({ username, password }) => {
    if (username && password) {
      return post('/q', {
        data: {
          token: FAKE_TOKEN,
        },
      });
    } else {
      return Promise.reject();
    }
  },
};

export default AuthSrv;
