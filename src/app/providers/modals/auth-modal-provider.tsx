import { ReactNode, useState } from 'react'

import { useSession } from '@/entities/session'
import { AuthModalContext } from '@/shared/libs/context/auth-modal-context'
import { AuthModal } from '@/widgets/modals/auth-modal'

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
