// src/lib/axios.ts
import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // your backend URL
  withCredentials: true, // send cookies with every request
});

// === Interceptor Logic ===
let isRefreshing = false;
let failedQueue= [];

const processQueue = (error, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue other requests while refreshing
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then((token: string) => {
          originalRequest.headers!['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post('/auth/refresh'); // call refresh

        const newAccessToken = res.data.accessToken;
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // retry the original request with new token
        originalRequest.headers!['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
