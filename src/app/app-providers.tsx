import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/features/theme'
import { queryClient } from '@/shared/libs/tanstack-query'
import { ComposeChildren } from '@/shared/utils'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider />
      <QueryClientProvider client={queryClient} />
      {children}
    </ComposeChildren>
  )
}
