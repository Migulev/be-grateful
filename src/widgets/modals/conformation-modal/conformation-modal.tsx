import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from '@/shared/components/credenza'
import { Button } from '@/shared/components/ui/button'

import { useI18n } from './i18n'
import { ConfirmModalParams } from './model/types'

export const ConformationModal = ({
  title,
  description,
  closeText,
  confirmText,
  onClose,
  onConfirm,
}: ConfirmModalParams) => {
  const { t } = useI18n()

  return (
    <form
      onKeyDown={e => {
        if (e.key === 'Enter') onConfirm()
      }}
    >
      <Credenza
        open
        onOpenChange={onClose}
      >
        <CredenzaContent className="bg-gradient px-2 sm:px-10 sm:py-6">
          <CredenzaHeader>
            <CredenzaTitle>{title}</CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody>
            {t('doYouWantTo')} {description}?
          </CredenzaBody>
          <CredenzaFooter className="mt-3 flex-col-reverse gap-3 md:flex">
            <Button
              onClick={onClose}
              variant={'destructive'}
            >
              {closeText}
            </Button>
            <Button
              onClick={onConfirm}
              variant={'secondary'}
            >
              {confirmText}
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </form>
  )
}
