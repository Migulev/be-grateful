import { Profile, ProfileAvatar, UploadInputButton } from '@/entities/profile'
import { useDeleteAvatar } from '@/features/profile'
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
      {/* !dev: color hardcoded */}
      <CredenzaContent className="border-neutral-500 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-2 sm:px-10 sm:py-6">
        <CredenzaHeader>
          <CredenzaTitle>Настройки</CredenzaTitle>
        </CredenzaHeader>
        <div className="mt-2 flex flex-col gap-6">
          <div className=" flex w-full items-center justify-center gap-6">
            <ProfileAvatar
              className=" size-14"
              profile={profile}
              loading={isUnderAvatarMutation}
            />
            {/* !dev: color hardcoded */}
            <div className="flex gap-4">
              <UploadInputButton
                className=" p-0 text-sky-300"
                onChange={handleAvatarUpdate}
                disabled={isUnderAvatarMutation}
              />
              {/* !dev: color hardcoded */}
              <Button
                variant={'link'}
                className=" p-0 text-red-500"
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
          />
        </div>
      </CredenzaContent>
    </Credenza>
  )
}
