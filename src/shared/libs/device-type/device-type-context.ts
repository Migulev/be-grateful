import { createStrictContext, useStrictContext } from '@/shared/utils'

export type DeviceTypeContextType = {
  isTouchScreen: boolean
}

export const DeviceTypeContext = createStrictContext<DeviceTypeContextType>()

export const useDeviceType = () => {
  const { isTouchScreen } = useStrictContext(DeviceTypeContext)

  return { isTouchScreen }
}
