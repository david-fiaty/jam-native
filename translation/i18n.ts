import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import english from '@/translation/resources/english';
import french from '@/translation/resources/french';

i18n.use(initReactI18next).init({
  lng: process.env.DEFAULT_LANGUAGE,
  fallbackLng: process.env.FALLBACK_LANGUAGE,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: english },
    fr: { translation: french },
  },
});

export default i18n;