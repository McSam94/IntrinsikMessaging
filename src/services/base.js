import axios from 'axios';
import { BASE_URL, FAKE_TOKEN } from '@env';
import { getData } from 'Utils/local-storage';

console.log(
  `%c Base URL: %c ${BASE_URL}`,
  'background-color: #80dfff; color: blue; font-weight: bold',
  'background-color: #80dfff; color: blue; text-decoration: none',
);

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = (await getData('@token')) ?? FAKE_TOKEN;

    return {
      ...config,
      data: {
        ...config.data,
        token,
      },
    };
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.request.use((request) => {
  console.log(
    `%c ${request.method.toUpperCase()} %c ${request.url}`,
    'background-color: #eeffee; color: green; font-weight: bold',
    'background-color: #eeffee; color: green; text-decoration: none',
  );
  if (request.data) {
    console.log('Body', JSON.parse(JSON.stringify(request.data)));
  }
  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `%c ${response.status} %c ${response.config.url}`,
      'background-color: #eeeeff; color: blue; font-weight: bold',
      'background-color: #eeeeff; color: blue; text-decoration: none',
      response.data,
    );
    return response;
  },
  (error) => {
    console.log(
      `%c ERROR %c ${error.config.url}`,
      'background-color: #ffb3b3; color: red; font-weight: bold',
      'background-color: #ffb3b3; color: red; text-decoration: none',
      JSON.parse(JSON.stringify(error)),
    );

    return Promise.reject(error.response);
  },
);

const { get, post } = apiClient;
export { get, post };
