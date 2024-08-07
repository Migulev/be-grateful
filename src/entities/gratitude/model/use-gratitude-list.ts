import { useQuery } from '@tanstack/react-query'

import { gratitudeListQuery, gratitudeQueryOnDate } from '../queries'
import { Gratitude } from './types'

export const useGratitudeList = (
  date: string | undefined,
  session: boolean,
):
  | { gratitudeList: Gratitude[] | undefined; isFetching: boolean }
  | undefined => {
  const fetchAllGratitudeList = date === 'all' && session
  const fetchGratitudeOnDateList =
    date !== undefined && date !== 'all' && session

  const { data: allGratitudeList, isFetching: allFetching } = useQuery({
    ...gratitudeListQuery(fetchAllGratitudeList),
  })
  const { data: gratitudeOnDateList, isFetching: onDateFetching } = useQuery({
    ...gratitudeQueryOnDate(fetchGratitudeOnDateList, date),
  })

  if (fetchAllGratitudeList)
    return { gratitudeList: allGratitudeList, isFetching: allFetching }
  if (fetchGratitudeOnDateList)
    return { gratitudeList: gratitudeOnDateList, isFetching: onDateFetching }
}
