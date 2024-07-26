import { type DurationTW } from '@/shared/global-types'
import { cn, convertDurationTW } from '@/shared/utils'

import { BrowserViewDeleteButton } from './ui/browser-view-delete-button'
import { MobileViewDeleteButton } from './ui/mobile-view-delete-button'

export const GratitudeLine = ({
  title,
  onDelete,
  isOptimistic = false,
  optimisticDuration = 0,
}: {
  title: string
  onDelete: () => void
  isOptimistic?: boolean
  optimisticDuration?: DurationTW
}) => {
  return (
    <div
      className={cn(
        `group/line relative`,
        `${isOptimistic && 'opacity-50'}`,
        convertDurationTW(optimisticDuration),
      )}
    >
      <div className="flex items-center border-b border-muted py-4 pl-8 pr-0 text-lg sm:pr-2">
        <p className="overflow-hidden break-words text-secondary-foreground">
          {`-  ${title}`}
        </p>
        <BrowserViewDeleteButton onDelete={onDelete} />
        <MobileViewDeleteButton onDelete={onDelete} />
      </div>
    </div>
  )
}
