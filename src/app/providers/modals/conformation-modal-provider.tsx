import { ReactNode, useState } from 'react'

import {
  ConfirmationContext,
  ConfirmationParams,
} from '@/shared/libs/context/conformation-context'
import {
  ConfirmModalParams,
  ConformationModal,
  defaultConfirmationParams,
} from '@/widgets/modals/conformation-modal'

export const ConformationModalProvider = ({
  children,
}: {
  children?: ReactNode
}) => {
  const [modalParams, setModalParams] = useState<ConfirmModalParams>()

  const closeConfirmation = () => {
    modalParams?.onClose()
  }

  const getConfirmation = (params: ConfirmationParams) => {
    return new Promise<boolean>(resolve => {
      setModalParams({
        ...defaultConfirmationParams,
        ...params,
        onConfirm: () => {
          setModalParams(undefined)
          resolve(true)
        },
        onClose: () => {
          closeConfirmation()
          setModalParams(undefined)
          resolve(false)
        },
      })
    })
  }

  return (
    <ConfirmationContext.Provider
      value={{
        getConfirmation,
      }}
    >
      {children}
      {modalParams && <ConformationModal {...modalParams} />}
    </ConfirmationContext.Provider>
  )
}
