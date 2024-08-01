import { lazy, ReactNode, Suspense, useEffect, useState } from 'react'

import { type ConfirmModalParams } from '@/widgets/modals/conformation-modal'
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
  const [defaultConfirmationParams, setDefaultConfirmationParams] =
    useState<ConfirmModalParams | null>(null)

  useEffect(() => {
    async function fetchData() {
      const loadConformationDefaultParams = (
        await import('@/widgets/modals/conformation-modal')
      ).defaultConfirmationParams
      setDefaultConfirmationParams(loadConformationDefaultParams)
    }
    fetchData()
  }, [])

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
      <Suspense fallback={null}>
        {' '}
        {modalParams && <ConformationModal {...modalParams} />}
      </Suspense>
    </ConfirmationContext.Provider>
  )
}
