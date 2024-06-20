import { useMutation } from '@tanstack/react-query'

import { useResetSession } from '@/entities/session'
import { authApi } from '@/shared/api/auth'

export const useLogOut = () => {
  const resetSession = useResetSession()

  const mutation = useMutation({
    mutationFn: authApi.logOut,
    onSuccess: resetSession,
  })
  return mutation.mutate
}
