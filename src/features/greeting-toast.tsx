import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { greetingQuery } from '@/entities/greeting'
import { useSession } from '@/entities/session'

export const GreetingToast = () => {
  const [toastId, setToastId] = useState<string | number>()
  const [firstTime, setFirstTime] = useState(true)
  const session = useSession()
  const { data: greeting } = useQuery({
    ...greetingQuery(!!session),
  })

  useEffect(() => {
    if (session && greeting && firstTime) {
      setTimeout(() => {
        const id = toast(
          <div className="flex w-full items-center justify-center">
            <p className="text-center text-lg text-primary capitalize-first">
              {greeting?.title}
            </p>
          </div>,
          {
            position: 'top-center',
            style: {
              backgroundColor: 'var(--custom-toast)',
            },
            duration: 5000,
          },
        )
        setToastId(id)
      }, 2000)
      setFirstTime(false)
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  }, [greeting, session, firstTime, toastId])

  return <></>
}
