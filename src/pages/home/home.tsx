import { GratitudeList } from '@/features/gratitude'

import { Hero } from './ui/hero'

export const Home = () => {
  return (
    <main className="container rounded pb-10">
      <Hero />
      <GratitudeList className="mx-auto mt-4" />
    </main>
  )
}
