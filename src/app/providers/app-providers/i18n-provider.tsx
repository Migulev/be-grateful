import { PropsWithChildren, useEffect, useState } from 'react'

import { I18nContext, type Lang } from '@/shared/libs/context/i18n-context'

const LANG_STORAGE_KEY = 'lang'

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [lang, setLang] = useState(
    (localStorage.getItem(LANG_STORAGE_KEY) as Lang) ||
      (detectBrowserLanguage() as Lang) ||
      'en',
  )

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
  }, [lang])

  const value = {
    lang,
    setLang,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

const detectBrowserLanguage = () => {
  // Access the preferred language from the navigator object
  const language = navigator.language || navigator.languages[0]

  // Split the language string to get the primary language code
  // For example, 'en-US' will be split into ['en', 'US']
  return language.split('-')[0] // Return the primary language code (e.g., 'en')
}
