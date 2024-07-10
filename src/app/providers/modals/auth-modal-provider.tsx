import { ReactNode, useState } from 'react'

import { AuthModal } from '@/widgets/modals/auth-modal'
import { useSession } from '@/entities/session'
import { AuthModalContext } from '@/shared/libs/context/auth-modal-context'

export const AuthModalProvider = ({ children }: { children?: ReactNode }) => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)
  const session = useSession()

  return (
    <AuthModalContext.Provider value={{ setIsOpenAuthModal }}>
      {children}
      {isOpenAuthModal && !session && (
        <AuthModal onClose={() => setIsOpenAuthModal(false)} />
      )}
    </AuthModalContext.Provider>
  )
}
