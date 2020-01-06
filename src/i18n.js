import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./LOCALES/en.json";
import translationJap from "./LOCALES/jap.json";

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    resources: {
      en: translationEng,
      jap: translationJap
    },
    // we init with resources
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    react: {
      wait: true
    }
  });

export default i18n;
