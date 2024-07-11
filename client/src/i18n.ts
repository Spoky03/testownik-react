import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pl from "./locales/pl.json";
import LanguageDetector from 'i18next-browser-languagedetector';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = 
{
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    fallbackLng: "pl",
  });

  export default i18n;