import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  toast_avatar_deleted: {
    en: 'Avatar deleted',
    ru: 'Аватар удален',
  },
  toast_avatar_updated: {
    en: 'Avatar updated',
    ru: 'Аватар обновлен',
  },
  toast_name_updated: {
    en: 'Name updated',
    ru: 'Имя обновлено',
  },
} as const)
