import { useState } from 'react'

import { GratitudeDateBar, GratitudeList } from '@/features/gratitude'
import { getLocalISOTime, separateFromTime } from '@/shared/utils'

import { Hero } from './ui/hero'

export const Home = () => {
  const [date, setDate] = useState<string>(separateFromTime(getLocalISOTime()))

  return (
    <main className="pb-10">
      <Hero />
      <div className="mx-auto mt-4 w-full sm:w-11/12 md:w-9/12">
        <GratitudeDateBar
          isActive={date}
          setIsActive={setDate}
        />
        <GratitudeList date={date} />
      </div>
    </main>
  )
}
