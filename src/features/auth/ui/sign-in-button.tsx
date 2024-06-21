import { useState } from 'react'

import { Button, ButtonProps } from '@/shared/components/ui/button'

import { useLoginWithGoogle } from '../model/use-log-in-with-google'
import { useLoginWithOtp } from '../model/use-log-in-with-otp'
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
  const { mutateAsync: logInWithOptAsync, isPending: isPendingOtp } =
    useLoginWithOtp()
  const { mutate: logInWithGoogle, isPending: isPendingGoogle } =
    useLoginWithGoogle()

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
      {isModalOpen && (
        <SingInModal
          onClose={() => setIsModalOpen(false)}
          onLogInWithOptAsync={logInWithOptAsync}
          onLogInWithGoogle={logInWithGoogle}
          isLogging={isPendingGoogle || isPendingOtp}
        />
      )}
    </>
  )
}
