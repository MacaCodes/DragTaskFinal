import axios from 'axios'
import queryString from 'query-string'

const baseUrl = 'http://192.168.0.40:3000/api/v1/'

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify({ params })
})

axiosClient.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');
  const noAuthEndpoints = ['/boards']; // Add endpoints that don't require auth
  const requiresAuth = !noAuthEndpoints.some(endpoint => config.url.includes(endpoint));

  if (requiresAuth && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  config.headers['Content-Type'] = 'application/json';
  return config;
});

axiosClient.interceptors.response.use(response => {
  if (response && response.data) return response.data
  return response
}, err => {
  if (!err.response) {
    return alert(err)
  }
  throw err.response
})

export default axiosClient