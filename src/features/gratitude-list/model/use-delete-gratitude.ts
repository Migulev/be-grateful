import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Gratitude, gratitude_query_key } from '@/entities/gratitude'
import { gratitudeApi } from '@/shared/api/gratitude'
import { toastError } from '@/shared/libs/toast'

export const useDeleteGratitude = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (gratitudeId: string) => {
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

    onError: (_, __, context) => {
      queryClient.setQueryData(
        [gratitude_query_key],
        context?.previousGratitudeList,
      )
      toastError()
    },
  })
}
