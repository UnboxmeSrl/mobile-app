import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en'
import it from '../locales/it'

const TRANSLATIONS = { en, it }

i18n.use(initReactI18next).init({
  resources: TRANSLATIONS,
  interpolation: {
    escapeValue: false, // not needed for react as it does escape per default to prevent xss!
  },
  debug: true,
  lng: 'en',
})

export default i18n
