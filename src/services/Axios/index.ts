import axios, { AxiosError } from "axios";
import { getData, removeCookie } from "../../utils/storage";

interface ApiInterface {
  method: string;
  url: string;
  data?: any;
  params?: any;
  // withCredentials?: boolean;
}

const _api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + "/v1/",
});

_api.interceptors.request.use(
  function (config: any) {
    config.headers["Content-Type"] = `Application/json`;
    config.headers["Authorization"] = getData("AccessToken");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const api = async ({
  method,
  url,
  data = null,
  params = null,
  // withCredentials = false,
}: ApiInterface) => {
  try {
    const response = await _api({
      method,
      url,
      data,
      params,
      // withCredentials,
    });

    return response;
  } catch (err: any | AxiosError) {
    // if (err.response.status === 401) {
    // removeCookie("AccessToken");
    // }

    throw err;
  }
};

export default api;