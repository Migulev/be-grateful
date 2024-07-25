import { createStrictContext, useStrictContext } from '../../utils'

export type SettingsModalContextType = {
  setIsOpenSettingsModal: (isOpen: boolean) => void
}

export const SettingsModalContext =
  createStrictContext<SettingsModalContextType>()

export const useSettingsModal = () => {
  const { setIsOpenSettingsModal } = useStrictContext(SettingsModalContext)

  return { setIsOpenSettingsModal }
}
