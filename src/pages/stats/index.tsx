import { FirstStats } from './first-stats'
import { SecondStats } from './second-stats'

export const Stats = () => {
  return (
    <div className=" mb-10 mt-4 flex flex-wrap justify-center gap-10 md:mx-20">
      <FirstStats />
      <SecondStats />
    </div>
  )
}
