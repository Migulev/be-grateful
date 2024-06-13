import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/shared/api/auth'

export const useLoginWithOtp = () => {
  return useMutation({
    mutationFn: (email: string) => {
      return authApi.logInWithOtp(email)
    },
  })
}
