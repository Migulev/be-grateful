import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  Gratitude,
  gratitude_query_key,
  useInvalidateGratitudeDates,
} from '@/entities/gratitude'
import { gratitudeApi } from '@/shared/api/gratitude'
import { useGetConfirmation } from '@/shared/libs/context/conformation-context'
import { UserCancelationError } from '@/shared/libs/errors'
import { toastError, toastSuccess } from '@/shared/libs/toast'

import { useI18n } from './i18n'

export const useDeleteGratitude = () => {
  const queryClient = useQueryClient()
  const { getConfirmation } = useGetConfirmation()
  const invalidateGratitudeDates = useInvalidateGratitudeDates()
  const { t } = useI18n()

  return useMutation({
    mutationFn: async ({
      gratitudeId,
    }: {
      gratitudeId: string
      date: string
    }) => {
      const conformation = getConfirmation({
        title: t('conformation_delete_title') as string,
        description: t('conformation_delete_description') as string,
      })
      if (!(await conformation)) throw new UserCancelationError()

      return gratitudeApi.deleteGratitude(gratitudeId)
    },

    onMutate: async variables => {
      const all_gratitude_query_key = [gratitude_query_key]
      const date_gratitude_query_key = [gratitude_query_key, variables.date]

      await queryClient.cancelQueries({ queryKey: all_gratitude_query_key })
      await queryClient.cancelQueries({ queryKey: date_gratitude_query_key })

      const previousAllGratitudeList = queryClient.getQueryData(
        all_gratitude_query_key,
      )
      const previousDateGratitudeList = queryClient.getQueryData(
        date_gratitude_query_key,
      )
      if (previousAllGratitudeList) {
        queryClient.setQueryData(all_gratitude_query_key, (old: Gratitude[]) =>
          old.filter(gratitude => gratitude.id !== variables.gratitudeId),
        )
      }
      if (previousDateGratitudeList) {
        queryClient.setQueryData(date_gratitude_query_key, (old: Gratitude[]) =>
          old.filter(gratitude => gratitude.id !== variables.gratitudeId),
        )
      }

      return { previousAllGratitudeList, previousDateGratitudeList }
    },

    onError: (error, variables, context) => {
      const all_gratitude_query_key = [gratitude_query_key]
      const date_gratitude_query_key = [gratitude_query_key, variables.date]

      queryClient.setQueryData(
        all_gratitude_query_key,
        context?.previousAllGratitudeList,
      )
      queryClient.setQueryData(
        date_gratitude_query_key,
        context?.previousDateGratitudeList,
      )
      if (error instanceof UserCancelationError) return

      toastError()
    },

    onSuccess: async () => {
      await invalidateGratitudeDates()
      toastSuccess(t('deletion_toast_success') as string)
    },
  })
}
