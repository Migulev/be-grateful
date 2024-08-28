import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  title: {
    en: 'Gratitude Diary',
    ru: 'Дневник Благодарности',
  },
} as const)
