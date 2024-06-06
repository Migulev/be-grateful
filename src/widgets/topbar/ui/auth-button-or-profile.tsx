import { useSession } from '@/entities/session'
import { SignInButton, useLogOut } from '@/features/auth'

import { ProfileAvatar } from './profile-avatar'
import { UiProfileMenu } from './ui-profile-menu'

export const AuthButtonOrProfile = () => {
  const { logOut } = useLogOut()

  const { session } = useSession()

  return (
    <>
      {session ? (
        <UiProfileMenu
          trigger={<ProfileAvatar profile={session} />}
          options={[{ label: 'настройки', onFunc: () => {} }]}
          onLogOut={logOut}
        />
      ) : (
        <SignInButton />
      )}
    </>
  )
}
