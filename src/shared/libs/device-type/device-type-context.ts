import { createStrictContext, useStrictContext } from '../utils'

export type DeviceTypeContextType = {
  isTouchScreen: boolean | null
}

export const DeviceTypeContext = createStrictContext<DeviceTypeContextType>()

export const useDeviceType = () => {
  const { isTouchScreen } = useStrictContext(DeviceTypeContext)

  return { isTouchScreen }
}
