import { useState } from 'react'

import { useSession } from '@/entities/session'
import { SignInButton, useLogOut } from '@/features/auth'
import { ProfileAvatar, UiProfileMenu } from '@/features/profile'
import { SettingsModal } from '@/features/settings'

export const AuthButtonOrProfile = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const logOut = useLogOut()
  const session = useSession()

  return (
    <>
      {session ? (
        <>
          <UiProfileMenu
            trigger={<ProfileAvatar profile={session} />}
            // !dev: hardcode
            options={[
              { label: 'настройки', onFunc: () => setIsSettingsOpen(true) },
            ]}
            lastOption={{ label: 'выйти', onFunc: logOut }}
          />
          {isSettingsOpen && (
            <SettingsModal
              onClose={() => setIsSettingsOpen(false)}
              profileAvatar={
                <ProfileAvatar
                  className=" size-14"
                  profile={session}
                />
              }
              name={session.name}
            />
          )}
        </>
      ) : (
        <SignInButton />
      )}
    </>
  )
}
