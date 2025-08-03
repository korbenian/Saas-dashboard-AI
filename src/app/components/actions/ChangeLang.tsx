'use client'

import { useLocale } from '../Language/LocaleProvider'

export default function ChangeLang () {
  const { locale, setLocale } = useLocale()

  return (
    <button
      onClick={() => setLocale(locale === 'ru' ? 'en' : 'ru')}
      className='p-2 border rounded cursor-pointer'
    >
      {locale === 'ru' ? '🇷🇺 Русский' : '🇬🇧 English'}
    </button>
  )
}
