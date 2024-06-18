'use client';

import { useI18n } from './i18n.provider';

export const useTranslate = () => {
  const { t } = useI18n();
  return t;
};
