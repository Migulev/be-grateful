import { useQueryClient } from '@tanstack/react-query'

import { gratitudeApi } from '@/shared/api/gratitude'
import { ValidationError } from '@/shared/libs/errors'

import { gratitudeArraySchema } from './model/types'

export const gratitude_query_key = 'gratitudeList'

export const gratitudeListQuery = () => ({
  queryKey: [gratitude_query_key],
  queryFn: async () => {
    const gratitudeList = await gratitudeApi.getGratitudeList()
    const validation = gratitudeArraySchema.safeParse(gratitudeList)
    if (validation.error) throw new ValidationError()
    return validation.data
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})

export const useResetGratitude = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.resetQueries({
      queryKey: [gratitude_query_key],
    })
}
