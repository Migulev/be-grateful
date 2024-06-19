import { GratitudeLine } from '@/entities/gratitude'
import { DurationTW } from '@/shared/types'
import { cn } from '@/shared/utils'

import { mockId } from './model/types'
import { useDeleteGratitude } from './model/use-delete-gratitude'
import { useGratitudeList } from './model/use-gratitude-list'

export const GratitudeList = ({
  className,
  optimisticInProgress = false,
  optimisticDuration,
}: {
  className?: string
  optimisticInProgress?: boolean // is a flag of a request in progress (isPending)
  optimisticDuration?: DurationTW
}) => {
  const { gratitudeList, canLoadMore } = useGratitudeList()
  const { mutate: deleteGratitude } = useDeleteGratitude()

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <ul
        // !dev: color hardcoded
        className="flex w-full flex-col gap-2 rounded-lg bg-yellow-200 p-6 sm:w-11/12 md:w-9/12"
      >
        {gratitudeList?.map((gratitude, index) =>
          gratitude.id === mockId ? (
            <li key={index}>
              <GratitudeLine
                date={gratitude.createdAt}
                text={gratitude.text}
                onDelete={() => {}}
              />
            </li>
          ) : (
            <li key={gratitude.id}>
              <GratitudeLine
                onDelete={() => deleteGratitude(gratitude.id)}
                date={gratitude.createdAt}
                text={gratitude.text}
                isOptimistic={index === 0 && optimisticInProgress}
                optimisticDuration={optimisticDuration}
              />
            </li>
          ),
        )}
      </ul>
      {canLoadMore && (
        <button
          onClick={() => {
            // setCanLoadMore(false)
            // setIsFirstLoad(false)
          }}
        >
          развернуть ...
        </button>
      )}
    </div>
  )
}
