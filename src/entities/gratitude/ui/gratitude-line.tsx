import { DurationTW } from '@/shared/types'
import { cn, convertDurationTW } from '@/shared/utils'

export const GratitudeLine = ({
  date,
  text,
  onDelete,
  isOptimistic = false,
  optimisticDuration = 0,
  isMock = false,
}: {
  date: string
  text: string
  onDelete: () => void
  isOptimistic?: boolean
  optimisticDuration?: DurationTW
  isMock?: boolean
}) => {
  // !todo: what to do with date?

  return (
    <div
      className={cn(
        `group/trash relative transition`,
        `${isOptimistic && 'opacity-50'}`,
        convertDurationTW(optimisticDuration),
      )}
    >
      {/* // !dev: color hardcoded */}
      <div className="border-b border-stone-300 p-2 px-4 text-lg">
        {isMock ? (
          <p className=" invisible block">Mock</p>
        ) : (
          <p
            onClick={onDelete}
            // !dev: color hardcoded
            className="break-words  text-stone-600"
          >
            {`-  ${text}`}
          </p>
        )}
      </div>
    </div>
  )
}
