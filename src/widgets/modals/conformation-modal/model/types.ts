import { ConfirmationParams } from '@/shared/libs/context/conformation-context'

export type ConfirmModalParams = ConfirmationParams & {
  onClose: () => void
  onConfirm: () => void
}
