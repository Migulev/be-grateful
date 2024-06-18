import { ReactNode, useEffect, useState } from 'react'

import { DeviceTypeContext } from '@/shared/libs/device-type'

export const DeviceTypeProvider = ({ children }: { children?: ReactNode }) => {
  const [isTouchScreen, setIsTouchScreen] = useState<boolean>(false)

  const isTouchScreenDevice = () => {
    try {
      document.createEvent('TouchEvent')
      return true
    } catch (e) {
      return false
    }
  }
  useEffect(() => {
    setIsTouchScreen(isTouchScreenDevice())
  }, [])

  return (
    <DeviceTypeContext.Provider value={{ isTouchScreen }}>
      {children}
    </DeviceTypeContext.Provider>
  )
}
