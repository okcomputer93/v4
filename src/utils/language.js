export const languageDetected = i18n => {
  const { language } = i18n;
  let simpleLanguage = language.slice(0, 2);
  if (!i18n.languages.includes(simpleLanguage)) {
    simpleLanguage = i18n.languages[-1];
  }
  return simpleLanguage;
};
