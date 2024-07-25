import { createStrictContext, useStrictContext } from '../../utils'

export type ConfirmationParams = {
  title?: string
  description?: string
  closeText?: string
  confirmText?: string
}

export type ConfirmationContextType = {
  getConfirmation: (params: ConfirmationParams) => Promise<boolean>
}

export const ConfirmationContext =
  createStrictContext<ConfirmationContextType>()

export const useGetConfirmation = () => {
  const { getConfirmation } = useStrictContext(ConfirmationContext)

  return { getConfirmation }
}
