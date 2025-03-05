import axios from "axios";
import store from "./redux/store";
import { sessionExpired } from "./redux/auth/actions.js";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
});

instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      store.dispatch(sessionExpired())
    }
    return Promise.reject(error);
  }
);

export default instance;
