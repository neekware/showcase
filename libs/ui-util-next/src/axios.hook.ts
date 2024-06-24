'use client';

import { useEffect } from 'react';
import { getAuthAxios } from '@lib/data-net-shared';
import { useAuthState } from '@lib/data-store-next';

export const useAuthAxios = (baseURL: string) => {
  const [auth, _] = useAuthState();
  const axiosAuth = getAuthAxios({ baseURL });

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        // do anything, like adding headers, etc.
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => {
        // do anything, like adding headers, etc.
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          // prevRequest.sent = true;
          // refresh token, then retry the request
          // return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosAuth;
};

export default useAuthAxios;
