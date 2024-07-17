import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { greetingQuery } from '@/entities/greeting'
import { useSession } from '@/entities/session'

export const GreetingToast = () => {
  const [firstTime, setFirstTime] = useState(true)
  const session = useSession()
  const { data: greeting } = useQuery({
    ...greetingQuery(!!session),
  })

  useEffect(() => {
    if (session && greeting && firstTime) {
      setTimeout(() => {
        toast(
          <div className="flex w-full items-center justify-center">
            <p className="text-center text-lg text-primary capitalize-first">
              {greeting?.title}
            </p>
          </div>,
          {
            position: 'top-center',
            style: {
              backgroundColor: '#FCF9E1',
            },
            duration: 5000,
          },
        )
      }, 2000)
      setFirstTime(false)
    }
  }, [greeting, session, firstTime])

  return <></>
}
