import { ReactNode } from 'react'

import { useDeviceType } from '../device-type-context'

export const BrowserView = ({ children }: { children?: ReactNode }) => {
  const { isTouchScreen } = useDeviceType()

  if (isTouchScreen === true || isTouchScreen === null) {
    return null
  }

  return <>{children}</>
}
