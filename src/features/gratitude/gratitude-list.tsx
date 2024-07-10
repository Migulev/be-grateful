import { useQuery } from '@tanstack/react-query'

import { GratitudeLine, gratitudeListQuery } from '@/entities/gratitude'
import { DurationTW } from '@/shared/global-types'
import { cn } from '@/shared/libs/utils'

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
    <ul
      // !dev: color hardcoded
      className={cn(
        className,
        'flex min-h-svh w-full flex-col rounded-lg border-r-[2.5px] border-t border-[#757154] bg-secondary p-6 shadow-lg sm:w-11/12 md:w-9/12',
      )}
    >
      {gratitudeList?.map((gratitude, index) => (
        <li key={gratitude.id}>
          <GratitudeLine
            onDelete={() => deleteGratitude(gratitude.id)}
            title={gratitude.title}
            isOptimistic={index === 0 && optimisticInProgress}
            optimisticDuration={optimisticDuration}
          />
        </li>
      ))}
    </ul>
  )
}
