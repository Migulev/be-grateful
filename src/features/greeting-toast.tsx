import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { greetingQuery } from '@/entities/greeting'
import { useSession } from '@/entities/session'
import { useTheme } from '@/shared/libs/context/theme-context'

export const GreetingToast = () => {
  const [toastId, setToastId] = useState<string | number>()
  const [firstTime, setFirstTime] = useState(true)
  const session = useSession()
  const { data: greeting } = useQuery({
    ...greetingQuery(!!session),
  })
  const { theme } = useTheme()
  const bgColor = theme === 'dark' ? '#1e293b' : '#F9FAFB'

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
              backgroundColor: bgColor,
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
  }, [greeting, session, firstTime, bgColor, toastId])

  return <></>
}
