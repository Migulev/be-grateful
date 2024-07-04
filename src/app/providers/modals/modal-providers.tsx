import { ComposeChildren } from '@/shared/libs/utils'

import { AuthModalProvider } from './auth-modal-provider'
import { ConformationModalProvider } from './conformation-modal-provider'
import { SettingModalProvider } from './settings-modal-provider'

export function ModalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <SettingModalProvider />
      <AuthModalProvider />
      <ConformationModalProvider />
      {children}
    </ComposeChildren>
  )
}
