import { Dot } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils'

export const GratitudeTab = ({
  children,
  active = false,
  onClick,
}: {
  children: string
  active?: boolean
  onClick?: () => void
}) => {
  return (
    <Button
      variant={'tab'}
      className={cn('h-[22px] px-4 opacity-50', { 'pr-0 opacity-100': active })}
      onClick={onClick}
    >
      <>
        {children}
        {active && (
          <Dot className="size-5 -translate-x-[2px] translate-y-[1px] text-secondary" />
        )}
      </>
    </Button>
  )
}
