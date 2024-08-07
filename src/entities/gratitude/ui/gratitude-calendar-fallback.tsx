import { Loader } from 'lucide-react'

import { cn } from '@/shared/utils'

export const GratitudeCalendarFallback = ({
  className,
}: {
  className?: string
}) => {
  return (
    <div
      className={cn(
        className,
        'z-10 flex h-[282px] w-[254px] items-center justify-center rounded  border border-primary bg-secondary',
      )}
    >
      <Loader className="animate-spin-slow" />
    </div>
  )
}
