import React, { useRef } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const UploadInputButton = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, children, accept = '.png, .jpeg', disabled, ...props },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInputClick = () => {
      inputRef.current?.click()
    }

    return (
      <>
        <Button
          className={className}
          variant={'link'}
          onClick={handleInputClick}
          disabled={disabled}
        >
          {children}
        </Button>
        <Input
          className="invisible absolute size-0 border-0 p-0"
          type="file"
          ref={inputRef}
          accept={accept}
          {...props}
          role="upload-input"
        />
      </>
    )
  },
)
