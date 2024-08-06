import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import {
  GratitudeCalendarButton,
  gratitudeDatesQuery,
  GratitudeTab,
} from '@/entities/gratitude'
import { GratitudeCalendar } from '@/entities/gratitude/ui/gratitude-calendar'
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
  isActive: string | undefined
  setIsActive: (date: string) => void
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
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
    <div className="relative">
      {isCalendarOpen && (
        <GratitudeCalendar
          datesList={uniqueDatesList || []}
          isActiveDate={isActive}
          setIsActiveDate={setIsActive}
          className="absolute right-3 top-12 z-10"
        />
      )}
      <div className=" flex items-end gap-5 px-[5px]">
        <GratitudeTab
          active={isActive === 'all'}
          onClick={() => setIsActive('all')}
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
        <GratitudeCalendarButton
          isActive={isCalendarOpen}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        />
      </div>
    </div>
  )
}