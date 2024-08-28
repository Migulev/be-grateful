import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  card_title: {
    en: 'Gratitudes by months',
    ru: 'Благодарности по месяцам',
  },
  months6: {
    en: '6 months',
    ru: '6 месяцев',
  },
  months9: {
    en: '9 months',
    ru: '9 месяцев',
  },
  months12: {
    en: '12 months',
    ru: '12 месяцев',
  },
  gratitude: {
    en: 'Gratitude',
    ru: 'Благодарность',
  },
  footer_1: {
    en: 'the most grateful month',
    ru: 'самый благодарный месяц',
  },
  footer_2_for: {
    en: 'Total for',
    ru: 'За',
  },
  footer_2: {
    en: 'months',
    ru: 'месяцев благодарностей',
  },
} as const)
