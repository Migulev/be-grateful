import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import {
  GratitudeCalendarButton,
  GratitudeCalendarFallback,
  gratitudeDatesQuery,
  GratitudeTab,
} from '@/entities/gratitude'
import { useSession } from '@/entities/session'
import {
  formatDate,
  getLocalISOTime,
  getLocalISOTimeOfYesterday,
  separateFromTime,
} from '@/shared/utils'

import { useI18n } from './i18n'
import { useOutsideCalendarClick } from './use-outside-calendar-click'

const GratitudeCalendar = lazy(() =>
  import('@/entities/gratitude/ui/gratitude-calendar').then(module => ({
    default: module.GratitudeCalendar,
  })),
)

export const GratitudeDateBar = ({
  isActive,
  setIsActive,
}: {
  isActive: string | undefined
  setIsActive: (date: string) => void
}) => {
  const { t } = useI18n()
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
        <div>
          <Suspense
            fallback={
              <GratitudeCalendarFallback className="absolute right-6 top-[60px]" />
            }
          >
            <GratitudeCalendar
              datesList={uniqueDatesList || []}
              isActiveDate={isActive}
              setIsActiveDate={setIsActive}
              className="absolute right-3 top-12 z-10"
              ref={refCalendar}
            />
          </Suspense>
        </div>
      )}
      <div className=" flex items-end gap-5 px-[5px]">
        <GratitudeTab
          active={isActive === 'all'}
          onClick={() => setIsActive('all')}
          disabled={!session}
        >
          {t('all') as string}
        </GratitudeTab>
        <div className="no-scrollbar ml-auto flex flex-row-reverse overflow-auto rounded-t">
          {uniqueDatesList?.map(date => {
            const today =
              separateFromTime(getLocalISOTime()) === date &&
              (t('today') as string)
            const yesterday =
              separateFromTime(getLocalISOTimeOfYesterday()) === date &&
              (t('yesterday') as string)

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
