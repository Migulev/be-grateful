import { useMutation } from '@tanstack/react-query'

import { useInvalidateSession } from '@/entities/session'
import { profileApi } from '@/shared/api/profile'
import { toastError, toastSuccess } from '@/shared/libs/toast'

import { useI18n } from './i18n'

export const useUpdateProfileName = () => {
  const invalidateSession = useInvalidateSession()
  const { t } = useI18n()

  return useMutation({
    mutationFn: (name: string) => profileApi.updateName(name),
    onSuccess: async () => {
      await invalidateSession()
      toastSuccess(t('toast_name_updated') as string)
    },
    onError: () => toastError(),
  })
}
