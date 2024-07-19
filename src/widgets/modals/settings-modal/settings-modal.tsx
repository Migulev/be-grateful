import { useDeleteAvatar } from '@/features/profile'
import { Profile, ProfileAvatar, UploadInputButton } from '@/entities/profile'
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from '@/shared/components/credenza'
import { Button } from '@/shared/components/ui/button'

import { useHandleAvatarUpdate } from './model/use-handle-avatar-update'
import { useHandleNameForm } from './model/use-handle-name-form'
import { NameForm } from './ui/name-form'

export const SettingsModal = ({
  onClose,
  profile,
}: {
  onClose: () => void
  profile: Profile
}) => {
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
          <CredenzaTitle>Настройки</CredenzaTitle>
        </CredenzaHeader>
        <div className="mt-2 flex flex-col gap-6">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <ProfileAvatar
              className="size-14"
              profile={profile}
              loading={isUnderAvatarMutation}
            />
            <div className="flex gap-6">
              <UploadInputButton
                className="p-0 text-foreground"
                onChange={handleAvatarUpdate}
                disabled={isUnderAvatarMutation}
              >
                загрузить
              </UploadInputButton>

              <Button
                variant={'link'}
                className="p-0 text-destructive"
                onClick={() => deleteAvatar()}
                disabled={isUnderAvatarMutation}
              >
                удалить
              </Button>
            </div>
          </div>
          <NameForm
            buttonDisabled={isUpdatingName}
            onSubmit={nameForm.handleSubmit(onNameSubmit)}
            fieldControl={nameForm.control}
            nameForm={nameForm}
          >
            изменить имя
          </NameForm>
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
