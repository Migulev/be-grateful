import { useQueryClient } from '@tanstack/react-query'

import { authApi } from '@/shared/api/auth'

const session_query_key = 'session'

export const sessionQuery = () => ({
  queryKey: [session_query_key],
  queryFn: authApi.getSession,
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})

export const useInvalidateSession = () => {
  const queryClient = useQueryClient()

  return () =>
    queryClient.invalidateQueries({
      queryKey: [session_query_key],
    })
}
