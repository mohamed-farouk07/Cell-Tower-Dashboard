import axios, { AxiosInstance } from "axios";
import { updateTokenApi } from "./authService";

const api: AxiosInstance = axios.create({
  baseURL: 'https://192.168.1.154:8073/auth/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const updatedData = await updateTokenApi();
        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${updatedData.accessToken}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;