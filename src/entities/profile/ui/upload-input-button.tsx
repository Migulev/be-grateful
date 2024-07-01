import React, { useRef } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const UploadInputButton = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, accept = '.png, .jpeg', disabled, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInputClick = () => {
      inputRef.current?.click()
    }

    return (
      <div className="relative flex items-center">
        {/* !dev: choose button color */}
        <Button
          className={className}
          variant={'link'}
          onClick={handleInputClick}
          disabled={disabled}
        >
          <span>Загрузить</span>
        </Button>
        <Input
          className="invisible size-0 border-0 p-0"
          type="file"
          ref={inputRef}
          accept={accept}
          {...props}
        />
      </div>
    )
  },
)
