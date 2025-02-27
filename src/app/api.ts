/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getData } from "../utils/storage";

interface ApiInterface {
  method: string;
  url: string;
  data?: any;
  params?: any;
  withCredentials?: boolean;
}

const _api = axios.create({
  // baseURL: `http://localhost:3000/v2/`,
  baseURL: `${import.meta.env.VITE_BASEURL}/v2/`,
});

_api.interceptors.request.use(
  function (config: any) {
    const token = getData("token");

    if (token) {
      config.headers["Authorization"] = `${token}`;
    }

    config.headers["Content-Type"] = `Application/json`;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

const api = async ({
  method,
  url,
  data = null,
  params = null,
  withCredentials = false,
}: ApiInterface) => {
  try {
    const response = await _api({
      method,
      url,
      data,
      params,
      withCredentials,
    });

    return response;
  } catch (err: any) {
    if (err.response.status === 401) {
      // 
    }

    throw err;
  }
};

export default api;
