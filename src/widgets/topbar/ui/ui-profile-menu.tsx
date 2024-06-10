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
      <PopoverContent className=" flex w-fit flex-col items-end gap-2 p-2 pr-0">
        {options?.map(option => (
          <Button
            variant={'link'}
            key={option.label}
            onClick={option.onFunc}
          >
            {option.label}
          </Button>
        ))}
        {/* !todo implement logout button */}
        <Button
          variant={'link'}
          // !dev: hardcode color
          className="text-red-500"
          onClick={onLogOut}
        >
          выход
        </Button>
      </PopoverContent>
    </Popover>
  )
}
