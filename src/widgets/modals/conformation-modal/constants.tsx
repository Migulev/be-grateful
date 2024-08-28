import { useI18n } from './i18n'
import { ConfirmModalParams } from './model/types'

export const useDefaultConfirmationParams = () => {
  const { t } = useI18n()
  return {
    title: t('title'),
    description: t('description'),
    closeText: t('closeText'),
    confirmText: t('confirmText'),
    onClose: () => {},
    onConfirm: () => {},
  } as ConfirmModalParams
}
