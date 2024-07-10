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
  lastOption,
}: {
  trigger: ReactNode
  options?: { label: string; onFunc: () => void }[]
  lastOption?: { label: string; onFunc: () => void }
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
        {lastOption && (
          <Button
            variant={'link'}
            // !dev: hardcode color
            className="text-destructive"
            onClick={lastOption.onFunc}
          >
            {lastOption.label}
          </Button>
        )}
      </PopoverContent>
    </Popover>
  )
}
