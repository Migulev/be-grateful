import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  now: {
    en: 'Now',
    ru: 'Сейчас',
  },
} as const)
