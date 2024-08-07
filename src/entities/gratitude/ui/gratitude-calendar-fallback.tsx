import { Spinner } from '@/shared/components/ui/spinner'
import { cn, useAppearance } from '@/shared/utils'

export const GratitudeCalendarFallback = ({
  className,
}: {
  className?: string
}) => {
  const isShown = useAppearance()
  if (!isShown) return null

  return (
    <div
      className={cn(
        className,
        'z-10 flex h-[282px] w-[254px] items-center justify-center rounded  border border-primary bg-secondary',
      )}
    >
      <Spinner />
    </div>
  )
}
