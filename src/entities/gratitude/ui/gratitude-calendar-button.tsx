import { CalendarDays } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils'

export const GratitudeCalendarButton = ({
  className,
  onClick,
  isActive,
}: {
  className?: string
  onClick?: () => void
  isActive?: boolean
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(className, 'size-10 rounded-b-none p-2 opacity-50', {
        'opacity-100': isActive,
      })}
    >
      <CalendarDays className="size-6" />
    </Button>
  )
}
