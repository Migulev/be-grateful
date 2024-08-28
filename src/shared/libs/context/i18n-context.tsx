import { createContext, ReactNode, useContext } from 'react'

export type Lang = 'ru' | 'en'

type I18nProviderState = {
  lang: Lang
  setLang: (lang: Lang) => void
}

const initialState: I18nProviderState = {
  lang: 'en',
  setLang: () => null,
}

export const I18nContext = createContext<I18nProviderState>(initialState)

export const useLang = () => {
  const context = useContext(I18nContext)

  if (context === undefined) {
    throw new Error('useLang must be used within a I18nProvider')
  }

  return context
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translation = string | ((props?: any) => ReactNode)

export function createI18nModule<
  T extends Record<string, Record<string, Translation>>,
>(translations: T) {
  return function useI18n() {
    const context = useContext(I18nContext)

    if (context === undefined) {
      throw new Error('useI18n must be used within a I18nProvider')
    }

    return {
      t: (key: keyof T, props?: unknown): ReactNode => {
        const translation = translations[key]?.[context.lang as string]
        if (typeof translation === 'string') {
          return translation
        }
        if (typeof translation === 'function') {
          return translation(props)
        }
        return key as unknown as ReactNode
      },
    }
  }
}
