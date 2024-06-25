import { ReactNode, useState } from 'react'

import { AuthModalContext } from '@/shared/libs/modals/auth-modal-context'
import { AuthModal } from '@/widgets/modals'

export const AuthModalProvider = ({ children }: { children?: ReactNode }) => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)

  return (
    <AuthModalContext.Provider value={{ setIsOpenAuthModal }}>
      {children}
      {isOpenAuthModal && (
        <AuthModal onClose={() => setIsOpenAuthModal(false)} />
      )}
    </AuthModalContext.Provider>
  )
}
