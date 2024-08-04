import { useQuery } from '@tanstack/react-query'

import { gratitudeListQuery, gratitudeQueryOnDate } from '../queries'
import { Gratitude } from './types'

export const useGratitudeList = (
  date: string | undefined,
): Gratitude[] | [] => {
  const fetchAllGratitudeList = date === 'all'
  const fetchGratitudeOnDateList = date !== undefined && date !== 'all'

  const { data: allGratitudeList } = useQuery({
    ...gratitudeListQuery(fetchAllGratitudeList),
  })
  const { data: gratitudeOnDateList } = useQuery({
    ...gratitudeQueryOnDate(fetchGratitudeOnDateList, date),
  })

  if (fetchAllGratitudeList) return allGratitudeList ?? []
  if (fetchGratitudeOnDateList) return gratitudeOnDateList ?? []

  return []
}
