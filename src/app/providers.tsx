import { ThemeProvider } from '@/features/theme'
import { ComposeChildren } from '@/shared/utils'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider />
      {children}
    </ComposeChildren>
  )
}
