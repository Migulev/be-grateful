import { GratitudeInput } from '@/entities/gratitude'
import { useSession } from '@/entities/session'
import { GratitudeList, useCreateGratitude } from '@/features/gratitude'

import { Hero } from './ui/hero'

export const Home = () => {
  const optimisticAnimationDuration = 700
  const { mutateAsync: createGratitudeAsync, isPending } = useCreateGratitude(
    optimisticAnimationDuration,
  )
  const session = useSession()

  return (
    <main className="container">
      <Hero />
      <section className="flex flex-col items-center gap-10">
        <GratitudeInput
          placeholder="За что ты сегодня благодарен/а?"
          onCreateAsync={async (gratitudeText: string) => {
            await createGratitudeAsync(gratitudeText)
          }}
          isPending={isPending}
          isAuthorized={!!session}
        />
        <GratitudeList
          optimisticInProgress={isPending}
          optimisticDuration={optimisticAnimationDuration}
        />
      </section>
    </main>
  )
}
