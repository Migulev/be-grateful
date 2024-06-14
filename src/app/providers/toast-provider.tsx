import { ReactNode } from 'react'
import { Toaster } from 'sonner'

import { useTheme } from '@/features/theme'

export const ToastProvider = ({ children }: { children?: ReactNode }) => {
  const { theme } = useTheme()

  return (
    <>
      {children}
      <Toaster theme={theme} />
    </>
  )
}
