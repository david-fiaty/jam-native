import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import 'intl/locale-data/jsonp/en'; 
import 'intl/locale-data/jsonp/fr';
import english from '@/translation/resources/english';
import french from '@/translation/resources/french';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: english },
      fr: { translation: french },
    },
  });

export default i18n;