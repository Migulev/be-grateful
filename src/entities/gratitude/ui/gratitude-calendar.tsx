import { CalendarDays } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils'

export const GratitudeCalendar = ({ className }: { className?: string }) => {
  return (
    <Button className={cn(className, 'rounded-b-none size-10 p-2')}>
      <CalendarDays className="size-6" />
    </Button>
  )
}
