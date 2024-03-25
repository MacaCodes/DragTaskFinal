import axios from 'axios'
import queryString from 'query-string'

// const baseURL = 'http://localhost:3000/api/v1/';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
      'Content-Type': 'application/json', // Ensures JSON content-type
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) return response.data;
    return response;
  },
  error => {
    if (!error.response) {
      return alert(error)
    }
    throw error;
  }
);


export default axiosClient
