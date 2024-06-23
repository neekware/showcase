'use client';

import axios from 'axios';
import { logger } from '@lib/data-logger-shared';

export const useRefreshToken = () => {
  const refreshToken = async (refreshUrl: string) => {
    try {
      const response = await axios.post(refreshUrl);
      return response;
    } catch (error) {
      logger.error('Error during refresh token:', error);
      return undefined;
    }
  };
  return refreshToken;
};
