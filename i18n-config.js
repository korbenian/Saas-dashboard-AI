
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
        logout: 'Logout'
      }
    },
    ru: {
      translation: {
        welcome: 'Добро пожаловать',
        logout: 'Выйти'
      }
    }
  },
  lng: 'en', // язык по умолчанию
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
