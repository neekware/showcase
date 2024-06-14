export type ServerResponseType<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
};
