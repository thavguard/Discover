import { AuthResponse } from "./../types/response/AuthResponse";
import axiosLib, { AxiosRequestConfig } from "axios";
import { config } from "process";

export const API_URL = "http://localhost:5050";

export const axios = axiosLib.create({
  withCredentials: true,
  baseURL: API_URL,
});

axios.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axiosLib.get<AuthResponse>(
          `${API_URL}/auth/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);

        return axios.request(originalRequest);
      } catch (error) {
        console.log({ error, message: "Не авторизован" });
      }
    }
    throw error;
  }
);
