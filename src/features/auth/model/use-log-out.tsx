import { useMutation } from '@tanstack/react-query'

import { useResetGratitude, useResetGratitudeDates } from '@/entities/gratitude'
import { useRemoveSession, useResetSession } from '@/entities/session'
import { authApi } from '@/shared/api/auth'
import { useGetConfirmation } from '@/shared/libs/context/conformation-context'
import { UserCancelationError } from '@/shared/libs/errors'
import { toastError } from '@/shared/libs/toast'

import { useI18n } from '../i18n'

export const useLogOut = () => {
  const resetSession = useResetSession()
  const removeSession = useRemoveSession()
  const resetGratitude = useResetGratitude()
  const resetGratitudeDates = useResetGratitudeDates()
  const { getConfirmation } = useGetConfirmation()

  const { t } = useI18n()

  const mutation = useMutation({
    mutationFn: async () => {
      const conformation = await getConfirmation({
        title: t('log_out') as string,
        description: t('log_out_description') as string,
      })
      if (!conformation) throw new UserCancelationError()

      await authApi.logOut()
    },
    onError: error => {
      if (error instanceof UserCancelationError) return
      toastError()
      resetSession()
      resetGratitude()
      resetGratitudeDates()
      window.location.reload()
    },

    onSuccess: () => {
      removeSession()
      resetGratitude()
      resetGratitudeDates()
      window.location.reload()
    },
  })

  return mutation.mutate
}
