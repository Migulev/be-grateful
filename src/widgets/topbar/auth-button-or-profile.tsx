import { ProfileAvatar, UiProfileMenu } from '@/entities/profile'
import { useSession } from '@/entities/session'
import { SignInButton, useLogOut } from '@/features/auth'
import { useSettingsModal } from '@/shared/libs/modals/settings-modal-context'

export const AuthButtonOrProfile = () => {
  const logOut = useLogOut()
  const session = useSession()
  const { setIsOpenSettingsModal } = useSettingsModal()

  return (
    <>
      {session ? (
        <UiProfileMenu
          trigger={<ProfileAvatar profile={session} />}
          // !dev: hardcode
          options={[
            {
              label: 'настройки',
              onFunc: () => setIsOpenSettingsModal(true),
            },
          ]}
          lastOption={{ label: 'выйти', onFunc: logOut }}
        />
      ) : (
        <SignInButton />
      )}
    </>
  )
}
