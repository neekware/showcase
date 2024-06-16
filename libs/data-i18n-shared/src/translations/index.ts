import type { Translations } from '../i18n.model';
import enCommon from './en/common.json';
import enMarketing from './en/marketing.json';
import frCommon from './fr/common.json';
import frMarketing from './fr/marketing.json';

export const initialTranslations: Translations = {
  en: { common: enCommon, marketing: enMarketing },
  fr: { common: frCommon, marketing: frMarketing },
};
