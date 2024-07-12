import { ConfirmModalParams } from './model/types'

export const defaultConfirmationParams: ConfirmModalParams = {
  title: 'Подтвердите',
  description: 'продолжить',
  closeText: 'Отменить',
  confirmText: 'Подтвердить',
  onClose: () => {},
  onConfirm: () => {},
}
