import { Dot } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils'

export const GratitudeTab = ({
  children,
  active = false,
  onClick,
  className,
  disabled,
}: {
  children: string
  active?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}) => {
  return (
    <Button
      variant={'tab'}
      className={cn(className, 'h-[22px] px-4 opacity-50', {
        'pr-0 opacity-100': active,
      })}
      onClick={onClick}
      disabled={disabled}
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
