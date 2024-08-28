import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  sign_in: {
    en: 'Sign in',
    ru: 'Вход',
  },
  log_out: {
    en: 'Log out',
    ru: 'Выход',
  },
  log_out_description: {
    en: 'log out from account',
    ru: 'выйти из аккаунта',
  },
} as const)
