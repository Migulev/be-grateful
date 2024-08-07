import { useQueryClient } from '@tanstack/react-query'

import { authApi } from '@/shared/api/auth'
import { ValidationError } from '@/shared/libs/errors'

import { sessionSchema } from './model/types'

export const session_query_key = 'session'

export const sessionQuery = () => ({
  queryKey: [session_query_key],
  queryFn: async () => {
    const session = await authApi.getSession()
    const validation = sessionSchema.safeParse(session)
    if (validation.error) throw new ValidationError()
    return validation.data
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})

export const useRemoveSession = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.removeQueries({
      queryKey: [session_query_key],
    })
}

export const useResetSession = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.resetQueries({
      queryKey: [session_query_key],
    })
}
