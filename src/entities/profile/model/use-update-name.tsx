import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/shared/api/auth'
import { toastError, toastSuccess } from '@/shared/libs/toast'

export const useUpdateProfileName = () => {
  return useMutation({
    mutationFn: (name: string) => authApi.updateName(name),
    onSuccess: () => toastSuccess('имя обновлено'),
    onError: () => toastError(),
  })
}
