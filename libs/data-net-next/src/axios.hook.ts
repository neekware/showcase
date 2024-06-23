'use client';

import { useEffect } from 'react';
import { getAxiosAuth } from '@lib/data-jwt-shared';
import { useAuthState } from '@lib/data-store-next';
import { useRefreshToken } from './refresh.hook';

export const useAxiosAuth = (baseURL: string, refreshUrl: string) => {
  const [auth, setAuthState] = useAuthState();
  const refreshToken = useRefreshToken();
  const axiosAuth = getAxiosAuth(baseURL);

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (auth.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        } else {
          delete config.headers['Authorization'];
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const res = await refreshToken(refreshUrl);
          if (!res) {
            return Promise.reject(error);
          }
          const { accessToken } = res.data;
          prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          setAuthState({ isLoggedIn: true, accessToken });
          return axiosAuth(prevRequest);
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

export default useAxiosAuth;
