import { ComposeChildren } from '@/shared/utils'

import { AuthModalProvider } from './auth-modal-provider'
import { SettingModalProvider } from './settings-modal-provider'

export function ModalProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <SettingModalProvider />
      <AuthModalProvider />
      {children}
    </ComposeChildren>
  )
}
