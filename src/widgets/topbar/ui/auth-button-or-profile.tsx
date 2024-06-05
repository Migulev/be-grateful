import { SignInButton } from '@/features/auth'

import { ProfileAvatar } from './profile-avatar'

export const AuthButtonOrProfile = () => {
  // const session = useSession()
  // if (!isAuthChecked) return null

  // const session = {
  //   email: 'mglv@ya.ru',
  // }

  // !todo: session check

  const session = false

  return <>{session ? <ProfileAvatar profile={session} /> : <SignInButton />}</>
}
