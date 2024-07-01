import { useMutation } from '@tanstack/react-query'

import { useInvalidateSession, useSession } from '@/entities/session'
import { authApi } from '@/shared/api/auth'
import { profileApi } from '@/shared/api/profile'
import { toastError, toastSuccess } from '@/shared/libs/toast'

export const useDeleteAvatar = () => {
  const session = useSession()
  const invalidateSession = useInvalidateSession()

  return useMutation({
    mutationFn: async () => {
      if (!session || !session.avatarUrl) throw new Error()

      const avatarsList = await profileApi.getAvatarStorageNameList(session.id)
      await profileApi.emptyAvatarStorage(avatarsList)
      await authApi.updateAvatarUrl('')
      await invalidateSession()
    },
    onSuccess: () => toastSuccess('Аватар удален'),
    onError: () => {
      toastError()
      invalidateSession()
    },
  })
}
