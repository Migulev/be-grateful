import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { greetingQuery } from '@/entities/greeting'
import { useSession } from '@/entities/session'

export const GreetingToast = () => {
  const session = useSession()
  const { data: greeting } = useQuery({
    ...greetingQuery(!!session),
  })

  useEffect(() => {
    if (session && greeting) {
      setTimeout(() => {
        toast(
          <div className="flex w-full items-center justify-center ">
            {/* !dev: color hardcoded */}
            <p className="text-yellow-200 text-center text-lg capitalize-first">
              {greeting?.title}
            </p>
          </div>,
          // !dev: color hardcoded
          {
            position: 'top-center',
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              border: '1px solid white',
            },
            duration: 5000,
          },
        )
      }, 2000)
    }
  }, [greeting, session])

  return <></>
}
