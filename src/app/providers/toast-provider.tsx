import { ReactNode } from 'react'
import { Toaster } from 'sonner'

import { useTheme } from '@/features/theme'
import { desktop } from '@/shared/constants'
import { useMediaQuery } from '@/shared/utils'

export const ToastProvider = ({ children }: { children?: ReactNode }) => {
  const { theme } = useTheme()
  const isDesktop = useMediaQuery(desktop)
  const position = isDesktop ? 'bottom-right' : 'top-center'

  return (
    <>
      {children}
      <Toaster
        position={position}
        theme={theme}
      />
    </>
  )
}
