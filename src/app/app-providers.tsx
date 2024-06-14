import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/shared/libs/tanstack-query'
import { ComposeChildren } from '@/shared/utils'

import { ThemeProvider } from './providers/theme-provider'
import { ToastProvider } from './providers/toast-provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <QueryClientProvider client={queryClient} />
      <ThemeProvider />
      <ToastProvider />
      {children}
    </ComposeChildren>
  )
}
