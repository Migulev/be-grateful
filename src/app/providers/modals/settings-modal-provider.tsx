import { lazy, ReactNode, Suspense, useState } from 'react'

import { useSession } from '@/entities/session'
import { SettingsModalContext } from '@/shared/libs/context/settings-modal-context'

const SettingsModal = lazy(() =>
  import('@/widgets/modals/settings-modal').then(module => ({
    default: module.SettingsModal,
  })),
)

export const SettingModalProvider = ({
  children,
}: {
  children?: ReactNode
}) => {
  const [isOpenSettingsModal, setIsOpenSettingsModal] = useState(false)
  const session = useSession()

  return (
    <SettingsModalContext.Provider value={{ setIsOpenSettingsModal }}>
      {children}
      {session && isOpenSettingsModal && (
        <Suspense fallback={null}>
          <SettingsModal
            profile={session}
            onClose={() => setIsOpenSettingsModal(false)}
          />
        </Suspense>
      )}
    </SettingsModalContext.Provider>
  )
}
