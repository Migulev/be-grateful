import { useQueryClient } from '@tanstack/react-query'

import { authApi } from '@/shared/api/auth'

import { sessionSchema } from './model/types'

const session_query_key = 'session'

export const sessionQuery = () => ({
  queryKey: [session_query_key],
  queryFn: async () => {
    const session = await authApi.getSession()
    const validation = sessionSchema.safeParse(session)
    if (validation.error) {
      throw new Error()
    }
    return validation.data
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})

export const useResetSession = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.resetQueries({
      queryKey: [session_query_key],
    })
}

export const useInvalidateSession = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({
      queryKey: [session_query_key],
    })
}
