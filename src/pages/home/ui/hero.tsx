import { ReactNode } from 'react'

export const Hero = ({ action }: { action: ReactNode }) => {
  return (
    <div className=" flex flex-col items-center justify-center text-center">
      <h1 className="drop-shadow-sm">
        {/* !dev: color hardcode */}
        <p className=" text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Благодарность
        </p>
        {/* !dev: color hardcode */}
        <p className=" -translate-y-2 whitespace-nowrap text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl ">
          на каждый день
        </p>
      </h1>
      {/* !dev: color hardcode */}
      <p className=" mt-1 whitespace-nowrap text-white/30 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        напоминание о хороших вещах в нашей жизни
      </p>
      {action}
    </div>
  )
}
