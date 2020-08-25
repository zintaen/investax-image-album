import axios from 'axios';
const API_URL = 'http://localhost:8888';

const service = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-requested-with': new Date().getTimezoneOffset(),
    'x-time-zone': new Date().getTimezoneOffset(),
  },
});

service.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error.message);
  }
);

service.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export { service };
