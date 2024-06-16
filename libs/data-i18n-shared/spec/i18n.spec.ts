import { createI18n, type I18n } from '../src/i18n.core';
import { Translations } from '../src/i18n.model';

describe('createI18n', () => {
  let initialTranslations: Translations;
  let i18n: I18n;

  beforeEach(() => {
    initialTranslations = {
      en: {
        common: {
          greeting: 'Hello',
        },
      },
      fr: {
        common: {
          greeting: 'Bonjour',
        },
      },
    };
    i18n = createI18n(initialTranslations);
  });

  afterEach(() => {
    // Reset the currentLocale to 'en' after each test
    i18n.setLocale('en');
  });

  it('should set initial locale to "en"', () => {
    // Initial locale is set in the createI18n function
    expect(i18n.currentLocale).toBe('en');
  });

  it('should return translated text for the current locale', () => {
    expect(i18n.t('greeting')).toBe('Hello'); // Default to 'en'
    i18n.setLocale('fr');
    expect(i18n.t('greeting')).toBe('Bonjour'); // Translated to 'fr'
  });

  it('should return key if translation not found', () => {
    expect(i18n.t('missing')).toBe('missing');
  });

  it('should return default namespace if namespace not provided', () => {
    expect(i18n.t('greeting')).toBe('Hello'); // Default namespace is 'common'
  });

  it('should return key if namespace not found', () => {
    expect(i18n.t('greeting', 'missing')).toBe('greeting'); // 'missing' namespace does not exist
  });
});
