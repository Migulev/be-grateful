import { ReactNode, useState } from 'react'

import { useSession } from '@/entities/session'
import { SettingsModalContext } from '@/shared/libs/modals/settings-modal-context'
import { SettingsModal } from '@/widgets/modals'

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
          name={session.name}
          onClose={() => setIsOpenSettingsModal(false)}
        />
      )}
    </SettingsModalContext.Provider>
  )
}
