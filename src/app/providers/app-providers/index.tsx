import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from '@/shared/libs/tanstack-query'
import { ComposeChildren } from '@/shared/utils'

import { ModalProviders } from '../modal-providers'
import { DeviceTypeProvider } from './device-type-provider'
import { I18nProvider } from './i18n-provider'
import { ThemeProvider } from './theme-provider'
import { ToastProvider } from './toast-provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <I18nProvider />
      <QueryClientProvider client={queryClient} />
      <ThemeProvider />
      <ToastProvider />
      <DeviceTypeProvider />
      <ModalProviders>
        <>
          {children} <ReactQueryDevtools initialIsOpen={false} />
        </>
      </ModalProviders>
    </ComposeChildren>
  )
}
