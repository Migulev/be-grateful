import { z } from 'zod'

import { useUpdateProfileAvatar } from '@/features/profile'
import { toastError } from '@/shared/libs/toast'

import { avatarFromSchema } from './types'

export const useHandleAvatarUpdate = () => {
  const { mutate: updateProfileAvatar, isPending: isUpdatingAvatar } =
    useUpdateProfileAvatar()

  const handleAvatarUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      avatarFromSchema.parse(file)
    } catch (error) {
      if (error instanceof z.ZodError) {
        toastError(error.errors[0].message)
      } else {
        toastError('Ошибка загрузки аватара')
      }
      return
    }

    updateProfileAvatar(file)
  }
  return { isUpdatingAvatar, handleAvatarUpdate }
}
