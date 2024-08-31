import { useDeleteAvatar } from '@/features/profile'
import { Profile, ProfileAvatar, UploadInputButton } from '@/entities/profile'
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from '@/shared/components/credenza'
import { Button } from '@/shared/components/ui/button'

import { useI18n } from './i18n'
import { useHandleAvatarUpdate } from './model/use-handle-avatar-update'
import { useHandleNameForm } from './model/use-handle-name-form'
import { GreetingSwitch } from './ui/greeting-switch'
import { NameForm } from './ui/name-form'

export const SettingsModal = ({
  onClose,
  profile,
}: {
  onClose: () => void
  profile: Profile
}) => {
  const { t } = useI18n()

  const { isUpdatingName, nameForm, onNameSubmit } = useHandleNameForm({
    profile,
  })
  const { isUpdatingAvatar, handleAvatarUpdate } = useHandleAvatarUpdate()
  const { mutate: deleteAvatar, isPending: isDeletingAvatar } =
    useDeleteAvatar()

  const isUnderAvatarMutation = isUpdatingAvatar || isDeletingAvatar

  return (
    <Credenza
      open
      onOpenChange={onClose}
    >
      <CredenzaContent className="bg-gradient px-2 sm:px-10 sm:py-6">
        <CredenzaHeader>
          <CredenzaTitle>{t('title')}</CredenzaTitle>
        </CredenzaHeader>
        <div className="mt-2 flex flex-col gap-6">
          <div className="flex w-full items-center justify-center gap-4">
            <ProfileAvatar
              className="size-14"
              profile={profile}
              loading={isUnderAvatarMutation}
            />
            <div className="flex">
              <UploadInputButton
                className="text-foreground"
                onChange={handleAvatarUpdate}
                disabled={isUnderAvatarMutation}
              >
                {t('upload')}
              </UploadInputButton>

              <Button
                variant={'link'}
                className="text-destructive"
                onClick={() => deleteAvatar()}
                disabled={isUnderAvatarMutation}
              >
                {t('delete')}
              </Button>
            </div>
          </div>
          <GreetingSwitch />
          <NameForm
            buttonDisabled={isUpdatingName}
            onSubmit={nameForm.handleSubmit(onNameSubmit)}
            fieldControl={nameForm.control}
            nameForm={nameForm}
          >
            {t('name_change')}
          </NameForm>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
