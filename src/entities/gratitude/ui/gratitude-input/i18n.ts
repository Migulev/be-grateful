import { createI18nModule } from '@/shared/libs/context/i18n-context'

import { MAX_GRATITUDE_TEXT_LENGTH } from '../../model/rules'

export const useI18n = createI18nModule({
  toastError: {
    en: `${MAX_GRATITUDE_TEXT_LENGTH} characters max`,
    ru: `${MAX_GRATITUDE_TEXT_LENGTH} символов максимум`,
  },
  enterGratitude: {
    en: 'Enter gratitude',
    ru: 'Введите благодарность',
  },
} as const)
