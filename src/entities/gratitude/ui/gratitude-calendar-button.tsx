import { forwardRef } from 'react'

import { CalendarDays } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils'

export const GratitudeCalendarButton = forwardRef<
  HTMLButtonElement,
  {
    isActive: boolean
    onClick: () => void
    disabled: boolean
    className?: string
  }
>(({ isActive, onClick, disabled, className }, ref) => {
  return (
    <Button
      onClick={onClick}
      className={cn(className, 'size-10 rounded-b-none p-2 opacity-50', {
        'opacity-100': isActive,
      })}
      disabled={disabled}
      ref={ref}
    >
      <CalendarDays className="size-6" />
    </Button>
  )
})
