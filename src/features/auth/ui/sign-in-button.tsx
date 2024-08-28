import { Button, ButtonProps } from '@/shared/components/ui/button'
import { useAuthModal } from '@/shared/libs/context/auth-modal-context'

import { useI18n } from '../i18n'

export const SignInButton = ({
  className,
  variant,
  size,
}: {
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}) => {
  const { t } = useI18n()
  const { setIsOpenAuthModal } = useAuthModal()
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={() => setIsOpenAuthModal(true)}
    >
      {t('sign_in')}
    </Button>
  )
}
