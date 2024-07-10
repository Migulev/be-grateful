import { ReactNode, useState } from 'react'

import { SettingsModal } from '@/widgets/modals/settings-modal'
import { useSession } from '@/entities/session'
import { SettingsModalContext } from '@/shared/libs/context/settings-modal-context'

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
        <SettingsModal
          profile={session}
          onClose={() => setIsOpenSettingsModal(false)}
        />
      )}
    </SettingsModalContext.Provider>
  )
}
