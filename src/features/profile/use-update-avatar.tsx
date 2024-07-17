import { useMutation } from '@tanstack/react-query'

import { useInvalidateSession, useSession } from '@/entities/session'
import { profileApi } from '@/shared/api/profile'
import { env } from '@/shared/env'
import { toastError, toastSuccess } from '@/shared/libs/toast'

const avatarBaseUrl = env.VITE_SUPABASE_AVATAR_BASE_URL

export const useUpdateProfileAvatar = () => {
  const session = useSession()
  const invalidateSession = useInvalidateSession()

  return useMutation({
    mutationFn: async (file: File) => {
      if (!session) throw new Error('No session')

      const avatarsList = await profileApi.getAvatarStorageNameList(session.id)
      await profileApi.emptyAvatarStorage(avatarsList)
      const uploadImage = await profileApi.uploadAvatar(session.id, file)

      await profileApi.updateAvatarUrl(avatarBaseUrl + uploadImage?.path)
      await invalidateSession()
    },
    onSuccess: () => toastSuccess('Аватар обновлен'),
    onError: () => {
      toastError()
    },
  })
}
