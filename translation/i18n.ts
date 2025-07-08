import { initReactI18next } from "react-i18next";
import { Config } from "@/constants/Config";
import i18n from "i18next";
import english from '@/translation/resources/en';
import french from '@/translation/resources/fr';

i18n.use(initReactI18next).init({
  lng: Config.defaultLanguage,
  fallbackLng: Config.fallbackLanguage,
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