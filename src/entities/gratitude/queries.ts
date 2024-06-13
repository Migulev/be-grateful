import { gratitudeApi } from '@/shared/api/gratitude'

export const gratitude_query_key = 'gratitudeList'

export const gratitudeListQuery = () => ({
  queryKey: [gratitude_query_key],
  queryFn: gratitudeApi.getGratitudeList,
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})
