import { Button, ButtonProps } from '@/shared/components/ui/button'
import { useAuthModal } from '@/shared/libs/modals/auth-modal-context'

export const SignInButton = ({
  className,
  variant,
  size,
}: {
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}) => {
  const { setIsOpenAuthModal } = useAuthModal()
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={() => setIsOpenAuthModal(true)}
    >
      вход
    </Button>
  )
}
