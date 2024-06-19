import { Gratitude, GratitudeLine } from '@/entities/gratitude'
import { cn } from '@/shared/utils'

import { useDeleteGratitude } from '../model/use-delete-gratitude'

export const GratitudeList = ({
  className,
  gratitudeList,
}: {
  className?: string
  gratitudeList?: Gratitude[]
}) => {
  const { mutate: deleteGratitude } = useDeleteGratitude()

  return (
    <ul
      className={cn(
        className,
        'flex w-full flex-col gap-2 rounded-lg bg-yellow-200 p-6 sm:w-11/12 md:w-9/12',
      )}
    >
      {gratitudeList?.map(gratitude => (
        <li key={gratitude.id}>
          <GratitudeLine
            date={gratitude.createdAt}
            onDelete={() => deleteGratitude(gratitude.id)}
            text={gratitude.text}
          />
        </li>
      ))}
    </ul>
  )
}
