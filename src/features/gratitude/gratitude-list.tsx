import { useQuery } from '@tanstack/react-query'

import {
  GratitudeInput,
  GratitudeLine,
  gratitudeListQuery,
} from '@/entities/gratitude'
import { useSession } from '@/entities/session'
import { cn } from '@/shared/libs/utils'

import { useCreateGratitude } from './model/use-create-gratitude'
import { useDeleteGratitude } from './model/use-delete-gratitude'

const optimisticAnimationDuration = 700

export const GratitudeList = ({ className }: { className?: string }) => {
  const { data: gratitudeList } = useQuery({
    ...gratitudeListQuery(),
  })
  const { mutateAsync: createGratitudeAsync, isPending: isCreating } =
    useCreateGratitude(optimisticAnimationDuration)
  const { mutate: deleteGratitude } = useDeleteGratitude()

  const session = useSession()

  return (
    <ul
      className={cn(
        className,
        'flex min-h-svh w-full flex-col rounded border-r-[2.5px] border-t border-accent bg-secondary p-6 shadow-lg sm:w-11/12 md:w-9/12',
      )}
    >
      {gratitudeList?.map((gratitude, index) => (
        <li key={gratitude.id}>
          <GratitudeLine
            onDelete={() => deleteGratitude(gratitude.id)}
            title={gratitude.title}
            isOptimistic={index === gratitudeList.length - 1 && isCreating}
            optimisticDuration={optimisticAnimationDuration}
          />
        </li>
      ))}
      {/* !todo: render input with gratitude */}
      <GratitudeInput
        onCreateAsync={async (gratitudeText: string) => {
          await createGratitudeAsync(gratitudeText)
        }}
        isAuthorized={!!session}
      />
    </ul>
  )
}
