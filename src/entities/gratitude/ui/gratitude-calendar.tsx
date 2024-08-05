import { useMemo } from 'react'

import { ru } from 'date-fns/locale'
import { Matcher } from 'react-day-picker'

import { Calendar } from '@/shared/components/ui/calendar'
import { separateFromTime } from '@/shared/utils'

export const GratitudeCalendar = ({
  datesList,
  setIsActiveDate,
  isActiveDate,
  className,
}: {
  datesList: string[]
  isActiveDate?: string
  setIsActiveDate: (date: string) => void
  className?: string
}) => {
  const dateObjectsList = useMemo(() => {
    return (
      datesList?.map(dateString => {
        return new Date(dateString + 'T00:00:00')
      }) || []
    )
  }, [datesList])

  const handleSelect = (date?: Date) => {
    if (date) {
      setIsActiveDate(separateFromTime(date.toISOString()))
    }
  }

  const functionMatcher: Matcher = (day: Date) => {
    return !dateObjectsList.some(
      enabledDate => enabledDate.toDateString() === day.toDateString(),
    )
  }

  return (
    <Calendar
      mode="single"
      selected={new Date(isActiveDate + 'T00:00:00')}
      onSelect={handleSelect}
      locale={ru}
      showOutsideDays={false}
      disabled={functionMatcher}
      className={className}
      classNames={{ months: 'bg-secondary rounded border border-primary' }}
    />
  )
}
