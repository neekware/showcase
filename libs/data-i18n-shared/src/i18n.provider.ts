'use client';

import { createContext, createElement, type ReactNode, useContext, useEffect, useRef } from 'react';
import { createI18n, type I18n } from './i18n.core';
import { initialTranslations } from './translations';

type I18nContextType = I18n | undefined;
const I18nContext = createContext<I18nContextType>(undefined);

export const useI18n = (): I18n => {
  const i18n = useContext(I18nContext);
  if (!i18n) throw new Error('useI18n must be used within an I18nProvider');
  return i18n;
};

export const I18nProvider = ({
  children,
  locale = 'en',
}: {
  children?: ReactNode;
  locale?: string;
}) => {
  const i18nRef = useRef<I18n>();
  if (!i18nRef.current) {
    i18nRef.current = createI18n(initialTranslations);
    i18nRef.current.setLocale(locale);
  }

  useEffect(() => {
    i18nRef.current!.setLocale(locale);
  }, []);

  return createElement(
    I18nContext.Provider,
    {
      value: i18nRef.current,
    },
    children
  );
};
