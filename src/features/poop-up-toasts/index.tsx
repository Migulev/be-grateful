import { useEffect, useState } from 'react'

import { toast } from 'sonner'

import { usePoopUpToastList } from '@/entities/poop_up'
import { PoopUpToast } from '@/entities/poop_up/model/types'
import { useSession } from '@/entities/session'
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { ToastPosition } from '@/shared/libs/toast'
import { wait } from '@/shared/utils'

import { useI18n } from './i18n'

const TOAST_DURATION = 5000
const FIRST_TOAST_TIMEOUT = 5000
const MAX_TOAST_TIMEOUT = 8000
const MIN_TOAST_TIMEOUT = 1000

export const PoopUpToasts = () => {
  const session = useSession()
  const [readyToFetch, setReadyToFetch] = useState(false)

  useEffect(() => {
    wait(FIRST_TOAST_TIMEOUT).then(() => {
      setReadyToFetch(true)
    })
  }, [])

  const { poopUpToastList } = usePoopUpToastList(readyToFetch && !session)
  const position = 'top-left'

  useEffect(() => {
    if (session || !poopUpToastList) return
    const { timeOutIds, toastIds } = ToastsSequence(position, poopUpToastList)
    return () => {
      timeOutIds.forEach(timeOutId => {
        clearTimeout(timeOutId)
      })
      toastIds.forEach(toastId => {
        toast.dismiss(toastId)
      })
    }
  }, [poopUpToastList, session])

  return <></>
}

function ToastsSequence(
  position: ToastPosition,
  poopUpToastList: PoopUpToast[],
) {
  let timeout = 0
  const timeOutIds = new Array<NodeJS.Timeout>()
  const toastIds = new Array<string | number>()

  for (let i = 0; i < poopUpToastList.length; i++) {
    const poopUpToast = poopUpToastList[i]
    const image = poopUpToast.image
    timeout += randomTimeout()

    const timeOutId = setTimeout(() => {
      const toastId = toast(
        <ToastJSX
          poopUpToast={poopUpToast}
          image={image}
        />,
        {
          position: position,
          duration: TOAST_DURATION,
          style: {
            backgroundColor: 'var(--custom-toast)',
          },
        },
      )
      toastIds.push(toastId)
    }, timeout)
    timeOutIds.push(timeOutId)
  }

  return { timeOutIds, toastIds }
}

function randomTimeout() {
  return Math.floor(Math.random() * MAX_TOAST_TIMEOUT) + MIN_TOAST_TIMEOUT
}

interface ToastJSXProps {
  poopUpToast: PoopUpToast
  image: HTMLImageElement
}

export const ToastJSX: React.FC<ToastJSXProps> = ({ poopUpToast, image }) => {
  const { t } = useI18n()

  return (
    <div className="flex w-full justify-between text-primary">
      <div className="flex items-center gap-5 ">
        <Avatar>
          <AvatarImage
            src={image?.src}
            className="object-cover"
          />
        </Avatar>
        <div className="flex flex-col gap-1">
          <h4 className="font-bold capitalize">{poopUpToast.name}</h4>
          <p className="capitalize-first">{poopUpToast.title}</p>
        </div>
      </div>
      <p className="break-normal">{t('now')}</p>
    </div>
  )
}
