import { useMutation } from '@tanstack/react-query'

import { useInvalidateSession, useSession } from '@/entities/session'
import { profileApi } from '@/shared/api/profile'
import { toastError, toastSuccess } from '@/shared/libs/toast'

import { useI18n } from './i18n'

export const useDeleteAvatar = () => {
  const session = useSession()
  const invalidateSession = useInvalidateSession()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async () => {
      if (!session || !session.avatarUrl) throw new Error()

      const avatarsList = await profileApi.getAvatarStorageNameList(session.id)
      await profileApi.emptyAvatarStorage(avatarsList)
      await profileApi.updateAvatarUrl('')
      await invalidateSession()
    },
    onSuccess: () => toastSuccess(t('toast_avatar_deleted') as string),
    onError: () => {
      toastError()
      invalidateSession()
    },
  })
}
