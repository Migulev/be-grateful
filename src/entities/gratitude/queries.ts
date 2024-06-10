import { gratitudeApi } from '@/shared/api/gratitude'

const gratitude_query_key = 'gratitude'

export const gratitudeQuery = () => ({
  queryKey: [gratitude_query_key],
  queryFn: gratitudeApi.getGratitudeList,
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})
