export const Hero = () => {
  return (
    <div className="text-center">
      <h1 className=" text-primary-foreground drop-shadow-sm">
        {/* <h1 className=" text-accent drop-shadow-sm"> */}
        {/* !dev: color hardcode */}
        <p className=" text-3xl font-bold tracking-tight  sm:text-4xl md:text-5xl">
          Благодарность
        </p>
        {/* !dev: color hardcode */}
        <p className=" -translate-y-2 whitespace-nowrap text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl ">
          на каждый день
        </p>
      </h1>
      {/* !dev: color hardcode
      <p className=" mt-1 whitespace-nowrap text-primary opacity-60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        напоминание о хорошем в нашей жизни
      </p> */}
    </div>
  )
}
