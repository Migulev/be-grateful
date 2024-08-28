import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  stats: {
    en: 'Stats',
    ru: 'Cтатистика',
  },
  settings: {
    en: 'Settings',
    ru: 'Настройки',
  },
  logout: {
    en: 'Logout',
    ru: 'Выйти',
  },
} as const)
