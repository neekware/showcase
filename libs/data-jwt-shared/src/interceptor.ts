import axios, { type AxiosRequestConfig, type AxiosRequestHeaders } from 'axios';

export interface AxiosInterceptorHeaders {
  [key: string]: string;
}

// Set default Content-Type header for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';

function onInternalCall(req: AxiosRequestConfig) {
  return ['get', 'post'].some((method) => req.method?.toLowerCase() === method);
}

let interceptor: number;

export const setInterceptor = (headers: AxiosInterceptorHeaders) => {
  if (interceptor) {
    axios.interceptors.request.eject(interceptor);
  }

  interceptor = axios.interceptors.request.use(
    function (req) {
      req.headers = {
        ...req.headers,
        ...headers,
      } as AxiosRequestHeaders;
      return req;
    },
    null,
    { runWhen: onInternalCall }
  );
  return interceptor;
};

export const resetInterceptor = () => {
  if (interceptor) {
    axios.interceptors.request.eject(interceptor);
  }
};
