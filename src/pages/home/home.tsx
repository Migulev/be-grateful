import { GratitudeInput } from '@/entities/gratitude'
import { GratitudeList, useCreateGratitude } from '@/features/gratitude-list'

import { Hero } from './ui/hero'

export const Home = () => {
  const optimisticAnimationDuration = 700
  const { mutateAsync: createGratitudeAsync, isPending } = useCreateGratitude(
    optimisticAnimationDuration,
  )

  return (
    <main className=" container ">
      <Hero />
      <section className="flex w-full flex-col items-center gap-10">
        <GratitudeInput
          placeholder="За что ты сегодня благодарен/а?"
          onCreateAsync={async (gratitudeText: string) => {
            await createGratitudeAsync(gratitudeText)
          }}
          isPending={isPending}
        />
        <GratitudeList
          isOptimistic={isPending}
          optimisticDuration={optimisticAnimationDuration}
        />
      </section>
    </main>
  )
}
