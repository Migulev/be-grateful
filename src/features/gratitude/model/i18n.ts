import { createI18nModule } from '@/shared/libs/context/i18n-context'

export const useI18n = createI18nModule({
  conformation_delete_title: {
    en: 'Delete',
    ru: 'Удаление',
  },
  conformation_delete_description: {
    en: 'delete gratitude',
    ru: 'удалить благодарность',
  },
  deletion_toast_success: {
    en: 'Gratitude deleted',
    ru: 'Благодарность удалена',
  },
} as const)
