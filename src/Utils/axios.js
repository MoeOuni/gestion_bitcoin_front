import axios from "axios";
import localStorageService from "./localStorageService";

const apiHost = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({ baseURL: apiHost });

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorageService().getToken();
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
