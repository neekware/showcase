import axios, { type AxiosInstance } from 'axios';

let axiosMainInstance: AxiosInstance | null = null;
let axiosAuthInstance: AxiosInstance | null = null;

// Create a new Axios instance with a base URL as our main fetcher
export const getAxiosMain = (baseURL: string): AxiosInstance => {
  if (!axiosMainInstance) {
    axiosMainInstance = axios.create({
      baseURL,
      timeout: 10000,
      timeoutErrorMessage: 'Request timed out',
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return axiosMainInstance;
};

// Create a new Axios instance with a base URL as our auth fetcher
export const getAxiosAuth = (baseURL: string): AxiosInstance => {
  if (!axiosAuthInstance) {
    axiosAuthInstance = axios.create({
      baseURL,
      timeout: 10000,
      timeoutErrorMessage: 'Request timed out',
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return axiosAuthInstance;
};
