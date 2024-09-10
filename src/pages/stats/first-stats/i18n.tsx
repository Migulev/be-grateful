import { TrendingUp } from 'lucide-react'

import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  cardTitle: {
    en: 'Gratitudes for the period',
    ru: 'Благодарности за период',
  },
  days90: {
    en: 'for 90 days',
    ru: 'за 90 дней',
  },
  days60: {
    en: 'for 60 days',
    ru: 'за 60 дней',
  },
  days30: {
    en: 'for 30 days',
    ru: 'за 30 дней',
  },
  days7: {
    en: 'for 7 days',
    ru: 'за 7 дней',
  },
  gratitude: {
    en: 'Gratitude',
    ru: 'Благодарность',
  },
  footer_1: {
    ru: ({ twoMonthsDifference }: { twoMonthsDifference: number }) => (
      <p className="flex gap-2 text-balance font-medium leading-none ">
        Текущие 30 дней превышает предыдущий на {twoMonthsDifference}%
        <TrendingUp className="h-4 w-4" />
      </p>
    ),
    en: ({ twoMonthsDifference }: { twoMonthsDifference: number }) => (
      <p className="flex gap-2 text-balance font-medium leading-none ">
        Current 30 days exceeds previous by {twoMonthsDifference}%
        <TrendingUp className="h-4 w-4" />
      </p>
    ),
  },
  footer_2: {
    ru: ({ gratitudeAmountAll }: { gratitudeAmountAll: number }) => (
      <p className="leading-none">
        <span className="relative mr-2">
          Общее <span className=" absolute -right-1 text-[8px]">*</span>
        </span>
        количество благодарностей - {gratitudeAmountAll}
      </p>
    ),
    en: ({ gratitudeAmountAll }: { gratitudeAmountAll: number }) => (
      <p className="leading-none">
        <span className="relative mr-2">
          Total <span className=" absolute -right-1 text-[8px]">*</span>
        </span>
        amount of gratitudes - {gratitudeAmountAll}
      </p>
    ),
  },
  comment: {
    ru: 'с момента регистрации',
    en: 'from the moment of registration',
  },
})
