import { useEffect } from 'react'
import { toast } from 'sonner'

import { usePoopUpToastList } from '@/entities/poop_up'
import { PoopUpToast } from '@/entities/poop_up/model/types'
import { useSession } from '@/entities/session'
import { Avatar, AvatarImage } from '@/shared/components/ui/avatar'
import { desktop } from '@/shared/libs/device-type/constants'
import { ToastPosition } from '@/shared/libs/toast'
import { useMediaQuery } from '@/shared/libs/utils'

const TOAST_DURATION = 5000
const FIRST_TOAST_TIMEOUT = 5000
const MAX_TOAST_TIMEOUT = 8000
const MIN_TOAST_TIMEOUT = 1000

export const PoopUpToasts = () => {
  const session = useSession()
  const { poopUpToastList } = usePoopUpToastList()
  const isDesktop = useMediaQuery(desktop)
  const position = isDesktop ? 'top-left' : 'bottom-left'

  useEffect(() => {
    if (session || !poopUpToastList) return
    ToastsSequence(position, poopUpToastList)
  })
  return <></>
}

function ToastsSequence(
  position: ToastPosition,
  poopUpToastList: PoopUpToast[],
) {
  let timeout = FIRST_TOAST_TIMEOUT

  for (let i = 0; i < poopUpToastList.length; i++) {
    const poopUpToast = poopUpToastList[i]
    const image = poopUpToast.image

    setTimeout(() => {
      toast(
        <div className="flex w-full justify-between">
          <div className=" flex items-center gap-5">
            <Avatar>
              <AvatarImage
                src={image?.src}
                className="object-cover"
              />
            </Avatar>
            <div className="flex flex-col gap-1">
              <h4 className=" font-bold capitalize">{poopUpToast.name}</h4>
              <p className=" capitalize-first">{poopUpToast.title}</p>
            </div>
          </div>
          <p className=" break-normal">now</p>
        </div>,
        {
          position: position,
          duration: TOAST_DURATION,
          // !dev: color
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            border: '1px solid white',
          },
        },
      )
    }, timeout)
    timeout += randomTimeout()
  }
}

function randomTimeout() {
  return Math.floor(Math.random() * MAX_TOAST_TIMEOUT) + MIN_TOAST_TIMEOUT
}
