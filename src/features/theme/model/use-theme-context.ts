import { useContext } from 'react'

import { ThemeProviderContext } from './theme-context'

export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }

  return context
}
