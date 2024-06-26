import { useQueryClient } from '@tanstack/react-query'

import { gratitudeApi } from '@/shared/api/gratitude'

export const gratitude_query_key = 'gratitudeList'

export const gratitudeListQuery = () => ({
  queryKey: [gratitude_query_key],
  queryFn: gratitudeApi.getGratitudeList,
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
