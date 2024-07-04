import { createStrictContext, useStrictContext } from '../utils'

export type AuthModalContextType = {
  setIsOpenAuthModal: (isOpen: boolean) => void
}

export const AuthModalContext = createStrictContext<AuthModalContextType>()

export const useAuthModal = () => {
  const { setIsOpenAuthModal } = useStrictContext(AuthModalContext)

  return { setIsOpenAuthModal }
}
