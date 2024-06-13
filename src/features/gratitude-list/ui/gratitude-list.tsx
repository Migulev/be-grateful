import { useQuery } from '@tanstack/react-query'

import { GratitudeCard, gratitudeListQuery } from '@/entities/gratitude'
import { DurationTW } from '@/shared/types'
import { cn } from '@/shared/utils'

import { useDeleteGratitude } from '../model/use-delete-gratitude'

export const GratitudeList = ({
  className,
  isOptimistic = false,
  optimisticDuration,
}: {
  className?: string
  isOptimistic?: boolean
  optimisticDuration?: DurationTW
}) => {
  const { data: gratitudeList } = useQuery({ ...gratitudeListQuery() })
  const { mutate: deleteGratitude } = useDeleteGratitude()

  return (
    <ul
      className={cn(
        className,
        'grid w-full max-w-sm items-start gap-4 sm:max-w-4xl sm:grid-cols-2 md:gap-8 lg:max-w-5xl lg:grid-cols-3',
      )}
    >
      {gratitudeList?.map((gratitude, index) => (
        <li key={gratitude.id}>
          <GratitudeCard
            onDelete={() => deleteGratitude(gratitude.id)}
            date={gratitude.createdAt}
            text={gratitude.text}
            isOptimistic={index === 0 && isOptimistic}
            optimisticDuration={optimisticDuration}
          />
        </li>
      ))}
    </ul>
  )
}
