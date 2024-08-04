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

export const GratitudeDateBar = ({
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
      const firstDate = uniqueDatesList[0]
      setIsActive(firstDate)
    }
  }, [isActive, setIsActive, uniqueDatesList])

  return (
    <div className=" flex items-end px-[5px]">
      <GratitudeTab
        active={isActive === 'all'}
        onClick={() => setIsActive('all')}
        className="mr-5"
      >
        Все
      </GratitudeTab>
      <div className="ml-auto flex flex-row-reverse overflow-auto rounded-t">
        {uniqueDatesList?.map(date => {
          const today =
            separateFromTime(getLocalISOTime()) === date && 'сегодня'
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
      </div>
      <GratitudeCalendar className="ml-5" />
    </div>
  )
}
