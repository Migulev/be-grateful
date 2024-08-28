import { useQueryClient } from '@tanstack/react-query'

import { gratitudeApi } from '@/shared/api/gratitude'
import { ONE_HOUR_TIME } from '@/shared/constants'
import { Lang } from '@/shared/libs/context/i18n-context'
import { ValidationError } from '@/shared/libs/errors'
import {
  getLocalISOTime,
  getYearMonths,
  separateFromTime,
} from '@/shared/utils'

import { gratitudeArraySchema } from './model/types'

export const gratitude_query_key = 'gratitudeList'
export const gratitude_dates_query_key = 'gratitudeDates'
const gratitude_first_stats_query_key = 'firstStats'
const gratitude_second_stats_query_key = 'secondStats'

export const gratitudeListQuery = (isEnabled: boolean) => ({
  queryKey: [gratitude_query_key],
  queryFn: async () => {
    const gratitudeList = await gratitudeApi.getGratitudeList()
    const validation = gratitudeArraySchema.safeParse(gratitudeList)
    if (validation.error) throw new ValidationError()
    return validation.data
  },
  refetchOnWindowFocus: false,
  staleTime: ONE_HOUR_TIME,
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
  staleTime: ONE_HOUR_TIME,
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
  staleTime: ONE_HOUR_TIME,
})

export const useResetGratitude = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.resetQueries({
      queryKey: [gratitude_query_key],
    })
}

export const useInvalidateGratitudeDates = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.invalidateQueries({
      queryKey: [gratitude_dates_query_key],
    })
}

export const useResetGratitudeDates = () => {
  const queryClient = useQueryClient()
  return () =>
    queryClient.resetQueries({
      queryKey: [gratitude_dates_query_key],
    })
}

export const gratitudeFirstStatsQuery = () => ({
  queryKey: [gratitude_first_stats_query_key],
  queryFn: async () => {
    const gratitudeAmountAll = await gratitudeApi.getGratitudesAmountTotal()
    const gratitudeAmount90 = await gratitudeApi.getGratitudesAmount_N_Days(90)
    const gratitudeAmount30 = await gratitudeApi.getGratitudesAmount_N_Days(30)
    const gratitudeAmount7 = await gratitudeApi.getGratitudesAmount_N_Days(7)
    const gratitudeAmountPrevious30 =
      await gratitudeApi.getGratitudesAmountForRangeOfPreviousDays(60, 30)

    if (
      !gratitudeAmountAll ||
      !gratitudeAmount90 ||
      !gratitudeAmount30 ||
      !gratitudeAmount7 ||
      !gratitudeAmountPrevious30
    )
      return {
        gratitudeAmountAll: 0,
        gratitudeAmount90: 0,
        gratitudeAmount30: 0,
        gratitudeAmount7: 0,
        gratitudeAmountPrevious30: 0,
      }
    return {
      gratitudeAmountAll,
      gratitudeAmount90,
      gratitudeAmount30,
      gratitudeAmount7,
      gratitudeAmountPrevious30,
    }
  },
  refetchOnWindowFocus: false,
})

export const gratitudeSecondStatsQuery = (lang: Lang) => ({
  queryKey: [gratitude_second_stats_query_key, lang],
  queryFn: async () => {
    const months = getYearMonths(lang)
    const results = []

    for (const { monthNumber, year, monthName } of months) {
      const amount = await gratitudeApi.getGratitudesAmountForMonth(
        monthNumber,
        year,
      )
      results.push({ monthNumber, year, amount, monthName })
    }

    return { gratitudeMonthData: results }
  },
})
