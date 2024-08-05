import { useQueryClient } from '@tanstack/react-query'

import { gratitudeApi } from '@/shared/api/gratitude'
import { ValidationError } from '@/shared/libs/errors'
import { getLocalISOTime, separateFromTime } from '@/shared/utils'

import { gratitudeArraySchema } from './model/types'

export const gratitude_query_key = 'gratitudeList'
export const gratitude_dates_query_key = 'gratitudeDates'

export const gratitudeListQuery = (isEnabled: boolean) => ({
  queryKey: [gratitude_query_key],
  queryFn: async () => {
    const gratitudeList = await gratitudeApi.getGratitudeList()
    const validation = gratitudeArraySchema.safeParse(gratitudeList)
    if (validation.error) throw new ValidationError()
    return validation.data
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
  enabled: isEnabled,
})

export const gratitudeQueryOnDate = (
  isEnabled: boolean,
  date: string | undefined,
) => ({
  queryKey: [gratitude_query_key, date],
  queryFn: async () => {
    if (!date) return []
    const gratitudeList = await gratitudeApi.getGratitudeListOnDate(date)
    const validation = gratitudeArraySchema.safeParse(gratitudeList)
    if (validation.error) throw new ValidationError()
    return validation.data
  },
  refetchOnWindowFocus: false,
  staleTime: Infinity,
  enabled: isEnabled,
})

export const gratitudeDatesQuery = () => ({
  queryKey: [gratitude_dates_query_key],
  queryFn: async () => {
    const gratitudeDates = await gratitudeApi.getGratitudeDates()

    if (!gratitudeDates) return [separateFromTime(getLocalISOTime())]

    const uniqueDates = new Set([
      separateFromTime(getLocalISOTime()),
      ...gratitudeDates.map(date => separateFromTime(date.created_at)),
    ])

    return Array.from(uniqueDates)
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
