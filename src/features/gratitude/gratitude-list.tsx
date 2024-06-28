import { useQuery } from '@tanstack/react-query'

import { GratitudeLine, gratitudeListQuery } from '@/entities/gratitude'
import { DurationTW } from '@/shared/types'
import { cn } from '@/shared/utils'

import { useDeleteGratitude } from './model/use-delete-gratitude'

export const GratitudeList = ({
  className,
  optimisticInProgress = false,
  optimisticDuration,
}: {
  className?: string
  optimisticInProgress?: boolean // is a flag of a request in progress (isPending)
  optimisticDuration?: DurationTW
}) => {
  const { data: gratitudeList } = useQuery({
    ...gratitudeListQuery(),
  })
  const { mutate: deleteGratitude } = useDeleteGratitude()

  return (
    <div className={cn(className, 'flex w-full flex-col items-center gap-2')}>
      <ul
        // !dev: color hardcoded
        className="flex min-h-svh w-full flex-col gap-2 rounded-lg bg-yellow-200 p-6 shadow-lg sm:w-11/12 md:w-9/12"
      >
        {gratitudeList?.map((gratitude, index) => (
          <li key={gratitude.id}>
            <GratitudeLine
              onDelete={() => deleteGratitude(gratitude.id)}
              date={gratitude.createdAt}
              title={gratitude.title}
              isOptimistic={index === 0 && optimisticInProgress}
              optimisticDuration={optimisticDuration}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
