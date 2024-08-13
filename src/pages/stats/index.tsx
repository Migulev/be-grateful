import { FirstStats } from './first-stats'
import { SecondStats } from './second-stats'

export const Stats = () => {
  return (
    <div className=" mt-4 flex flex-wrap justify-center gap-10 md:mt-20">
      <FirstStats />
      <SecondStats />
    </div>
  )
}
