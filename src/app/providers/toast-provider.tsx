import { ReactNode } from 'react'

import { Toaster } from 'sonner'

import { useTheme } from '@/shared/libs/context/theme-context'
import { desktop } from '@/shared/libs/device-type/constants'
import { useMediaQuery } from '@/shared/libs/utils'

export const ToastProvider = ({ children }: { children?: ReactNode }) => {
  const { theme } = useTheme()
  const isDesktop = useMediaQuery(desktop)
  const position = isDesktop ? 'bottom-right' : 'top-center'
  const expand = isDesktop ? false : true
  const visibleToasts = isDesktop ? 5 : 2

  return (
    <>
      {children}
      <Toaster
        position={position}
        theme={theme}
        visibleToasts={visibleToasts}
        expand={expand}
      />
    </>
  )
}
