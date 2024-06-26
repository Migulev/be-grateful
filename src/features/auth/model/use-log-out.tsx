import { useMutation } from '@tanstack/react-query'

import { useResetGratitude } from '@/entities/gratitude'
import { useResetSession } from '@/entities/session'
import { authApi } from '@/shared/api/auth'

export const useLogOut = () => {
  const resetSession = useResetSession()
  const resetGratitude = useResetGratitude()

  const mutation = useMutation({
    mutationFn: authApi.logOut,
    onSuccess: () => {
      resetSession()
      resetGratitude()
    },
  })
  return mutation.mutate
}
