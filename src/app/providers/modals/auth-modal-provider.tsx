import { ReactNode, useState } from 'react'

import { useSession } from '@/entities/session'
import { AuthModalContext } from '@/shared/libs/modals/auth-modal-context'
import { AuthModal } from '@/widgets/modals'

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
