import axios, { type AxiosInstance } from 'axios';

let axiosMainInstance: AxiosInstance | null = null;
let axiosAuthInstance: AxiosInstance | null = null;

export interface axiosOptions {
  baseURL?: string;
  timeout?: number;
  timeoutErrorMessage?: string;
  headers?: { [key: string]: string };
}

// Create a new Axios instance with a base URL as our main fetcher
export const getMainAxios = (options: axiosOptions): AxiosInstance => {
  if (!axiosMainInstance) {
    axiosMainInstance = axios.create({
      baseURL: '/',
      timeout: 10000,
      timeoutErrorMessage: 'Request timed out',
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  }
  return axiosMainInstance;
};

// Create a new Axios instance with a base URL as our auth fetcher
export const getAuthAxios = (options: axiosOptions): AxiosInstance => {
  if (!axiosAuthInstance) {
    axiosAuthInstance = axios.create({
      baseURL: '/',
      timeout: 10000,
      timeoutErrorMessage: 'Request timed out',
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  }
  return axiosAuthInstance;
};
