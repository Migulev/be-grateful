import { DurationTW } from '@/shared/types'
import { cn, convertDurationTW, formatDate } from '@/shared/utils'

export const GratitudeLine = ({
  date,
  text,
  onDelete,
  isOptimistic = false,
  optimisticDuration = 0,
}: {
  date: string
  text: string
  onDelete: () => void
  isOptimistic?: boolean
  optimisticDuration?: DurationTW
  isMock?: boolean
}) => {
  const formattedDate = formatDate(date)

  return (
    <div
      className={cn(
        `group/trash relative transition`,
        `${isOptimistic && 'opacity-50'}`,
        convertDurationTW(optimisticDuration),
      )}
    >
      {/* // !dev: color hardcoded */}
      <div className="h-10 border-b border-stone-300 p-2 px-4">
        <p
          onClick={onDelete}
          // !dev: color hardcoded
          className="break-words text-lg text-stone-600"
        >
          {text}
        </p>
      </div>
    </div>
  )
}
