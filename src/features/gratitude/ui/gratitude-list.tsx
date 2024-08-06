import {
  GratitudeInput,
  GratitudeLine,
  useGratitudeList,
} from '@/entities/gratitude'
import { useSession } from '@/entities/session'
import { cn, getLocalISOTime, separateFromTime } from '@/shared/utils'

import { useCreateGratitude } from '../model/use-create-gratitude'
import { useDeleteGratitude } from '../model/use-delete-gratitude'

const optimisticAnimationDuration = 700

export const GratitudeList = ({
  className,
  date,
}: {
  className?: string
  date?: string
}) => {
  const gratitudeList = useGratitudeList(date)

  const { mutateAsync: createGratitudeAsync, isPending: isCreating } =
    useCreateGratitude(optimisticAnimationDuration, date)
  const { mutate: deleteGratitude } = useDeleteGratitude()

  const session = useSession()
  const today = separateFromTime(getLocalISOTime()) === date

  const renderInput = !session || today

  return (
    <ul
      className={cn(
        className,
        'min-h-svh rounded border-r-[2.5px] border-t border-accent bg-secondary p-6 shadow-lg',
      )}
    >
      {gratitudeList?.map((gratitude, index) => (
        <li key={gratitude.id}>
          <GratitudeLine
            onDelete={() =>
              deleteGratitude({
                gratitudeId: gratitude.id,
                date: separateFromTime(gratitude.createdAt),
              })
            }
            title={gratitude.title}
            isOptimistic={index === gratitudeList.length - 1 && isCreating}
            optimisticDuration={optimisticAnimationDuration}
          />
        </li>
      ))}
      {renderInput && (
        <GratitudeInput
          onCreateAsync={async (title: string) => {
            await createGratitudeAsync(title)
          }}
          isAuthorized={!!session}
        />
      )}
    </ul>
  )
}
