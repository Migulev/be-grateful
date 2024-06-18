import { ReactNode } from 'react'

import { useDeviceType } from '../device-type-context'

export const MobileView = ({ children }: { children?: ReactNode }) => {
  const { isTouchScreen } = useDeviceType()

  if (!isTouchScreen) {
    return null
  }

  return <>{children}</>
}
