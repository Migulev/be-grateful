import { QueryClient, UseQueryResult } from '@tanstack/react-query'

export type QueryResultWithoutData = Omit<UseQueryResult, 'data'>

export const queryClient = new QueryClient()
