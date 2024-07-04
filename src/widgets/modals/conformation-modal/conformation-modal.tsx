import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from '@/shared/components/credenza'
import { Button } from '@/shared/components/ui/button'

import { ConfirmModalParams } from './model/types'

export const ConformationModal = ({
  title,
  description,
  closeText,
  confirmText,
  onClose,
  onConfirm,
}: ConfirmModalParams) => {
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
        {/* !dev: color hardcoded */}
        <CredenzaContent className="border-neutral-500 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-2 sm:px-10 sm:py-6">
          <CredenzaHeader>
            <CredenzaTitle>{title}</CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody>Вы уверены что хотите {description}?</CredenzaBody>
          <CredenzaFooter className=" mt-3 flex-col-reverse gap-3 md:flex">
            <Button
              onClick={onClose}
              variant={'destructive'}
            >
              {closeText}
            </Button>
            <Button onClick={onConfirm}>{confirmText}</Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </form>
  )
}
