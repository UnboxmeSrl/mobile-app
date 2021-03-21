import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import en from '../locales/en'
import it from '../locales/it'

const TRANSLATIONS = { en, it }

i18n.use(initReactI18next).init({
  debug: __DEV__,
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: TRANSLATIONS,
})

export const t = i18n.t

export default i18n
