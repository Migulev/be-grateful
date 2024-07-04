import { useMutation } from '@tanstack/react-query'

import { useInvalidateSession } from '@/entities/session'
import { profileApi } from '@/shared/api/profile'
import { toastError, toastSuccess } from '@/shared/libs/toast'

export const useUpdateProfileName = () => {
  const invalidateSession = useInvalidateSession()

  return useMutation({
    mutationFn: (name: string) => profileApi.updateName(name),
    onSuccess: async () => {
      await invalidateSession()
      toastSuccess('имя обновлено')
    },
    onError: () => toastError(),
  })
}
