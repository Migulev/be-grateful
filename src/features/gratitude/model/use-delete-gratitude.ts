import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Gratitude, gratitude_query_key } from '@/entities/gratitude'
import { gratitudeApi } from '@/shared/api/gratitude'
import { useGetConfirmation } from '@/shared/libs/context/conformation-context'
import { UserCancelationError } from '@/shared/libs/errors'
import { toastError, toastSuccess } from '@/shared/libs/toast'

export const useDeleteGratitude = () => {
  const queryClient = useQueryClient()
  const { getConfirmation } = useGetConfirmation()

  return useMutation({
    mutationFn: async (gratitudeId: string) => {
      const conformation = getConfirmation({
        title: 'Удаление',
        description: 'удалить благодарность',
      })
      if (!(await conformation)) throw new UserCancelationError()

      return gratitudeApi.deleteGratitude(gratitudeId)
    },

    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: [gratitude_query_key] })

      const previousGratitudeList = queryClient.getQueryData([
        gratitude_query_key,
      ])

      await queryClient.setQueryData(
        [gratitude_query_key],
        (old: Gratitude[]) => old.filter(gratitude => gratitude.id !== id),
      )

      return { previousGratitudeList }
    },

    onError: (error, __, context) => {
      queryClient.setQueryData(
        [gratitude_query_key],
        context?.previousGratitudeList,
      )
      if (error instanceof UserCancelationError) return
      toastError()
    },

    onSuccess: () => {
      toastSuccess('Благодарность удалена')
    },
  })
}
