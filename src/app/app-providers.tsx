import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { queryClient } from '@/shared/libs/tanstack-query'
import { ComposeChildren } from '@/shared/utils'

import { DeviceTypeProvider } from './providers/device-type-provider'
import { ThemeProvider } from './providers/theme-provider'
import { ToastProvider } from './providers/toast-provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <QueryClientProvider client={queryClient} />
      <ThemeProvider />
      <ToastProvider />
      <DeviceTypeProvider />
      <>
        {children} <ReactQueryDevtools initialIsOpen={false} />
      </>
    </ComposeChildren>
  )
}
