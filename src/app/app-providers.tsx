import { ThemeProvider } from '@/features/theme'
import { ComposeChildren } from '@/shared/utils'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider />
      {children}
    </ComposeChildren>
  )
}
