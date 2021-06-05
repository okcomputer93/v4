import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instan
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      es: {
        translations: require('../locales/es/translations.json'),
      },
      'es-ES': {
        translations: require('../locales/es/translations.json'),
      },
      'es-MX': {
        translations: require('../locales/es/translations.json'),
      },
      en: {
        translations: require('../locales/en/translations.json'),
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

i18next.languages = ['es', 'es-ES', 'es-MX', 'en'];

export default i18next;
