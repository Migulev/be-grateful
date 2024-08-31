import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { greetingQuery } from '@/entities/greeting'
import { useSession } from '@/entities/session'
import { useLang } from '@/shared/libs/context/i18n-context'

export const GreetingToast = () => {
  const [toastId, setToastId] = useState<string | number>()
  const [firstTime, setFirstTime] = useState(true)
  const session = useSession()
  const { data: greeting } = useQuery({
    ...greetingQuery(!!session && session?.greetingSettings),
  })

  const { lang } = useLang()

  useEffect(() => {
    if (session && greeting && firstTime) {
      setTimeout(() => {
        const id = toast(
          <div className="flex w-full items-center justify-center">
            <p className="text-center text-lg text-primary capitalize-first">
              {greeting[lang]}
            </p>
          </div>,
          {
            position: 'top-center',
            style: {
              backgroundColor: 'var(--custom-toast)',
            },
            duration: 3000,
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
  }, [greeting, session, firstTime, toastId, lang])

  return <></>
}
