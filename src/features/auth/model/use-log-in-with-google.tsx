import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/shared/api/auth'

export const useLoginWithGoogle = () => {
  return useMutation({
    mutationFn: authApi.logInWithGoogle,
  })
}
