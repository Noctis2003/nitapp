// api.js
// this is the basic axios interceptor
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

// Response interceptor
api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

   
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        await api.get("/auth/refresh", { withCredentials: true });


        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // You might want to redirect to login here:
   
      }
    }

    return Promise.reject(error);
  }
);

export default api;
