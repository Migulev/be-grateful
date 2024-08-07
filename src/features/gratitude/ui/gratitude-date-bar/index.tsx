import { useEffect, useRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import {
  GratitudeCalendarButton,
  gratitudeDatesQuery,
  GratitudeTab,
} from '@/entities/gratitude'
import { GratitudeCalendar } from '@/entities/gratitude/ui/gratitude-calendar'
import { useSession } from '@/entities/session'
import {
  formatDate,
  getLocalISOTime,
  getLocalISOTimeOfYesterday,
  separateFromTime,
} from '@/shared/utils'

import { useOutsideCalendarClick } from './use-outside-calendar-click'

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
    if (uniqueDatesList) {
      const firstDate = uniqueDatesList[0]
      setIsActive(firstDate)
    }
  }, [setIsActive, uniqueDatesList])

  const session = useSession()

  const refCalendar = useRef<HTMLDivElement>(null)
  const refCalendarButton = useRef<HTMLButtonElement>(null)
  useOutsideCalendarClick(refCalendar, refCalendarButton, () =>
    setIsCalendarOpen(false),
  )

  return (
    <div className="relative">
      {isCalendarOpen && (
        <GratitudeCalendar
          datesList={uniqueDatesList || []}
          isActiveDate={isActive}
          setIsActiveDate={setIsActive}
          className="absolute right-3 top-12 z-10"
          ref={refCalendar}
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
          disabled={!session}
          ref={refCalendarButton}
        />
      </div>
    </div>
  )
}
