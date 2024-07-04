import { ConfirmModalParams } from './model/types'

export const defaultConfirmationParams: ConfirmModalParams = {
  title: 'Подтвердите',
  description: 'продолжить',
  closeText: 'Отмена',
  confirmText: 'Подтвердить',
  onClose: () => {},
  onConfirm: () => {},
}
