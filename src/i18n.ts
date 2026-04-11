import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esTranslation from './locales/es/translation.json';
import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslation },
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'pt'],
    // Map regional codes to base language: "pt-BR" -> "pt", "en-US" -> "en", "es-AR" -> "es".
    // Anything without a supported base (e.g. "fr", "de") falls back to "es".
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    detection: {
      // Check localStorage first (user preference), then browser language.
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    returnObjects: true,
  });

export default i18n;
