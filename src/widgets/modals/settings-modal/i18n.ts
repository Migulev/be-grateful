import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  title: {
    en: 'Settings',
    ru: 'Настройки',
  },
  upload: {
    en: 'upload',
    ru: 'загрузить',
  },
  delete: {
    en: 'delete',
    ru: 'удалить',
  },
  greetings: {
    en: 'Greeting',
    ru: 'Приветствие',
  },
  greeting_tooltip: {
    en: 'Greeting toast at the opening of the application',
    ru: 'Приветствие при открытии приложения',
  },
  name_change: {
    en: 'change name',
    ru: 'изменить имя',
  },
} as const)
