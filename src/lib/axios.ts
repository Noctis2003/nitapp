import axios from 'axios';
axios.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post('http://localhost:4000/auth/refresh');
        return axios(originalRequest); 
      } catch (e) {
        return Promise.reject(e); 
      }
    }

    return Promise.reject(err); 
  }
);

export default axios;