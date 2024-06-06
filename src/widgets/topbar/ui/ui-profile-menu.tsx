import { ReactNode } from 'react'

import { Button } from '@/shared/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'

export const UiProfileMenu = ({
  trigger,
  options,
  onLogOut,
}: {
  trigger: ReactNode
  options?: { label: string; onFunc: () => void }[]
  onLogOut: () => void
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className=" flex w-fit flex-col items-end gap-2 p-2">
        {options?.map(option => (
          <Button
            key={option.label}
            onClick={option.onFunc}
          >
            {option.label}
          </Button>
        ))}
        <Button
          className="mt-2"
          onClick={onLogOut}
        >
          выход
        </Button>
      </PopoverContent>
    </Popover>
  )
}
