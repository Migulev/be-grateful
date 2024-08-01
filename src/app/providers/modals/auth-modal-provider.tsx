import { lazy, ReactNode, Suspense, useState } from 'react'

import { useSession } from '@/entities/session'
import { AuthModalContext } from '@/shared/libs/context/auth-modal-context'

const AuthModal = lazy(() =>
  import('@/widgets/modals/auth-modal').then(module => ({
    default: module.AuthModal,
  })),
)

export const AuthModalProvider = ({ children }: { children?: ReactNode }) => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)
  const session = useSession()

  return (
    <AuthModalContext.Provider value={{ setIsOpenAuthModal }}>
      {children}
      {isOpenAuthModal && !session && (
        <Suspense fallback={null}>
          <AuthModal onClose={() => setIsOpenAuthModal(false)} />
        </Suspense>
      )}
    </AuthModalContext.Provider>
  )
}
