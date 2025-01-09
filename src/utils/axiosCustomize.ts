import axios from "axios";
import { useUserStore } from "../zustand/useUserStore";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Lấy access_token từ Zustand store
    const access_token = useUserStore.getState().account.access_token;

    if (access_token && !config?.url?.includes("/User/Login")) {
      config.headers["Authorization"] = "Bearer " + access_token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Xử lý dữ liệu phản hồi
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Xử lý lỗi phản hồi
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
