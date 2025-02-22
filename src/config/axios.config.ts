import axios, { AxiosInstance } from "axios";
import { MessageToastType } from "../store/reducer/app.reducer";

export const HTTP_SERVICE = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout: 1000,
  },
  // .. other options
});

export const setupAxiosInterceptors = (
  increaseFetch: () => void,
  decreaseFetch: () => void,
  openMsg: (msg: MessageToastType) => void,
  axiosCustoms: AxiosInstance[]
) => {
  const onRequestSuccess = (config: any) => {
    if (!config.ignoreSpinner) {
      increaseFetch();
    }
    return config;
  };

  const onResponseSuccess = (response: any) => {
    const { config } = response;
    if (!(config && config.ignoreSpinner)) {
      decreaseFetch();
    }
    return response;
  };

  const onResponseError = (err: any) => {
    const { config } = err;
    if (!(config && config.ignoreSpinner)) {
      decreaseFetch();
    }
    const status = err.status || (err.response ? err.response.status : 0);
    //   openMsg({
    //     msg: messageError,
    //     type: "error",
    //   });
    if (status === 401) {
    }
    if (status === 403) {
    }
    return Promise.reject(err);
  };

  axiosCustoms.forEach((axiosCustom) => {
    axiosCustom.interceptors.request.use(onRequestSuccess);
    axiosCustom.interceptors.response.use(onResponseSuccess, onResponseError);
  });
};
