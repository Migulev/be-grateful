import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  today: {
    en: 'today',
    ru: 'cегодня',
  },
  yesterday: {
    en: 'yesterday',
    ru: 'вчера',
  },
  all: {
    en: 'all',
    ru: 'все',
  },
} as const)
