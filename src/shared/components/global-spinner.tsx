import { useState } from 'react'

import { cn, useAppearance } from '../utils'
import { Spinner } from './ui/spinner'

export const GlobalSpinner = () => {
  const [isShown, setIsShown] = useState(true)
  const isAppeared = useAppearance({ appearanceDelay: 500 })

  if (!isShown || !isAppeared) return null
  return (
    <div
      onClick={() => setIsShown(false)}
      className={cn(
        'animate-slide-down absolute left-0 top-0 flex h-16 w-full items-center justify-center rounded-b-full bg-[#ffffff40]',
      )}
    >
      <Spinner />
    </div>
  )
}
