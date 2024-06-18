export type ServerResponseType<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type DataRetrieval<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};
