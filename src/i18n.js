import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  de: {
    translation: {
      form_submit: "Speichern",
      button_login: "Log in",
      button_logout: "Log out",
      language_de: "Deutsch",
      language_en: "Englisch",
      language_fr: "Französisch",
      language_plain: "Sprache 1",
      language_translated: "Sprache 2",
      word_category: "Wortart",
      word_category_verb: "Verb",
      word_category_adjective: "Adjektiv",
      word_category_noun: "Nomen",
      vocabulary: "Dein Vokabular",
      vocabulary_new: "Vokabular erstellen",
      vocabulary_name: "Name",
      created: "Erstellt",
      "Here you can see your added words.":
        "Hier kannst du deine hinzugefügten Wörter sehen.",
      "Today is a good day to learn vocabulary.":
        "Heute ist ein guter Tag um Vokabeln zu lernen.",
      "Let's get started by creating a new vocabulary!":
        "Hier sieht's aber leer aus! Lass uns ein neues Vokabular erstellen.",
      Hello: "Hallo",
    },
  },
  en: {
    translation: {
      form_submit: "Submit",
      button_login: "Log in",
      button_logout: "Log out",
      language_de: "German",
      language_en: "English",
      language_fr: "French",
      language_plain: "Language 1",
      language_translated: "Language 2",
      word_plain: "Infinitive",
      word_category: "Verbatim",
      word_category_verb: "Verb",
      word_category_adjective: "Adjective",
      word_category_noun: "Noun",
      vocabulary: "Your vocabulary",
      vocabulary_new: "Create vocabulary",
      vocabulary_name: "Name",
      created: "Created",
      "Here you can see your added words.":
        "Here you can see your added words.",
      "Today is a good day to learn vocabulary.":
        "Today is a good day to study!",
      "Let's get started by creating a new vocabulary!":
        "Let's get started by creating a new vocabulary!",
      Hello: "Hello",
    },
  },
  /*fr: {
        translation: {
            "form_submit": "Soumettre",
            "button_login": "Connecter",
            "button_logout": "Déconnecter",
            "language_de": "Allemand",
            "language_en": "Anglais",
            "language_fr": "Français",
            "word_infinitive": "Infinitif",
            "word_category": "Catégorie",
            "word_category_verb": "Verbe",
            "word_category_adjective": "Adjectif",
            "word_category_noun": "Nom",
            "vocabulary": "Ton vocabulaire",
            "Here you can see your added words.": "Vous pouvez voir ici les mots que vous avez ajoutés.",
            "Hello": "Sâlut"
        }
    }*/
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
