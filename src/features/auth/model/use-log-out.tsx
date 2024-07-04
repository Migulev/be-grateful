import { useMutation } from '@tanstack/react-query'

import { useResetGratitude } from '@/entities/gratitude'
import { useResetSession } from '@/entities/session'
import { authApi } from '@/shared/api/auth'
import { useGetConfirmation } from '@/shared/libs/context/conformation-context'
import { UserCancelationError } from '@/shared/libs/errors'
import { toastError } from '@/shared/libs/toast'

export const useLogOut = () => {
  const resetSession = useResetSession()
  const resetGratitude = useResetGratitude()
  const { getConfirmation } = useGetConfirmation()

  const mutation = useMutation({
    mutationFn: async () => {
      const conformation = getConfirmation({
        title: 'Выход',
        description: 'выйти из аккаунта',
      })
      if (!(await conformation)) throw new UserCancelationError()
      await authApi.logOut()
    },
    onError: error => {
      if (error instanceof UserCancelationError) return
      toastError()
    },
    onSettled: () => {
      resetSession()
      resetGratitude()
    },
  })

  return mutation.mutate
}
