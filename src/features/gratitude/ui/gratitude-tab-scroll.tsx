import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import {
  GratitudeCalendar,
  gratitudeDatesQuery,
  GratitudeTab,
} from '@/entities/gratitude'
import {
  formatDate,
  getLocalISOTime,
  getLocalISOTimeOfYesterday,
  separateFromTime,
} from '@/shared/utils'

export const GratitudeTabScroll = ({
  isActive,
  setIsActive,
}: {
  isActive?: string
  setIsActive: (date: string) => void
}) => {
  const { data: uniqueDatesList } = useQuery({
    ...gratitudeDatesQuery(),
  })

  useEffect(() => {
    if (uniqueDatesList && !isActive) {
      const lastDate = uniqueDatesList[uniqueDatesList.length - 1]
      setIsActive(lastDate)
    }
  }, [isActive, setIsActive, uniqueDatesList])

  return (
    <div className=" flex items-end justify-end">
      <GratitudeTab
        active={isActive === 'all'}
        onClick={() => setIsActive('all')}
      >
        Все
      </GratitudeTab>
      {uniqueDatesList?.map(date => {
        const today = separateFromTime(getLocalISOTime()) === date && 'сегодня'
        const yesterday =
          separateFromTime(getLocalISOTimeOfYesterday()) === date && 'вчера'

        return (
          <GratitudeTab
            active={date === isActive}
            key={date}
            onClick={() => setIsActive(date)}
          >
            {today || yesterday || formatDate(date)}
          </GratitudeTab>
        )
      })}
      <GratitudeCalendar className="ml-5 mr-1" />
    </div>
  )
}
