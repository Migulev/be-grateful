import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  title: {
    en: 'Confirmation',
    ru: 'Подтвердите',
  },
  description: {
    en: 'continue',
    ru: 'продолжить',
  },
  closeText: {
    en: 'Cancel',
    ru: 'Отменить',
  },
  confirmText: {
    en: 'Confirm',
    ru: 'Подтвердить',
  },
  doYouWantTo: {
    en: 'Do you want to',
    ru: 'Вы уверены что хотите',
  },
} as const)
