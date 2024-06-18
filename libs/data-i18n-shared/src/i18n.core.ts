import type { Translations } from './i18n.model';

let currentLocale: string = 'en';

export function createI18n(initialTranslations: Translations) {
  const setLocale = (locale: string) => {
    currentLocale = locale;
  };

  const t = (key: string, namespace: string = 'common') => {
    return initialTranslations[currentLocale]?.[namespace]?.[key] || key;
  };

  return { t, setLocale, currentLocale };
}

export type I18n = ReturnType<typeof createI18n>;
