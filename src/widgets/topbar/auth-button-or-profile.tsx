import { SignInButton, useLogOut } from '@/features/auth'
import { ProfileAvatar, UiProfileMenu } from '@/entities/profile'
import { useSession } from '@/entities/session'
import { useSettingsModal } from '@/shared/libs/context/settings-modal-context'

import { useI18n } from './i18n'

export const AuthButtonOrProfile = () => {
  const { t } = useI18n()
  const logOut = useLogOut()
  const session = useSession()
  const { setIsOpenSettingsModal } = useSettingsModal()

  return (
    <>
      {session ? (
        <UiProfileMenu
          trigger={<ProfileAvatar profile={session} />}
          options={[
            {
              label: t('settings') as string,
              onFunc: () => setIsOpenSettingsModal(true),
            },
          ]}
          lastOption={{ label: t('logout') as string, onFunc: logOut }}
        />
      ) : (
        <SignInButton />
      )}
    </>
  )
}
