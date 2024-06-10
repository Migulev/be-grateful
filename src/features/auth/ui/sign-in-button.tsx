import { useState } from 'react'

import { Button, ButtonProps } from '@/shared/components/ui/button'

import { SingInModal } from './sign-in-modal'

export const SignInButton = ({
  className,
  variant,
  size,
}: {
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className={className}
        variant={variant}
        size={size}
        onClick={() => setIsModalOpen(true)}
      >
        вход
      </Button>
      {isModalOpen && <SingInModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
