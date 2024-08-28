import { lazy, ReactNode, Suspense, useState } from 'react'

import {
  useDefaultConfirmationParams,
  type ConfirmModalParams,
} from '@/widgets/modals/conformation-modal'
import { GlobalSpinner } from '@/shared/components/global-spinner'
import {
  ConfirmationContext,
  ConfirmationParams,
} from '@/shared/libs/context/conformation-context'

const ConformationModal = lazy(() =>
  import('@/widgets/modals/conformation-modal').then(module => ({
    default: module.ConformationModal,
  })),
)

export const ConformationModalProvider = ({
  children,
}: {
  children?: ReactNode
}) => {
  const [modalParams, setModalParams] = useState<ConfirmModalParams>()
  const defaultConfirmationParams = useDefaultConfirmationParams()

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
      <Suspense fallback={<GlobalSpinner />}>
        {modalParams && <ConformationModal {...modalParams} />}
      </Suspense>
    </ConfirmationContext.Provider>
  )
}
