import { ThemeButton } from '@/features/theme'
import { Logo } from '@/shared/components/Logo'

import { AuthButtonOrProfile } from './auth-button-or-profile'

export const Topbar = () => {
  return (
    <nav className="container flex items-center justify-between px-8 py-4 md:px-10 md:py-6 lg:px-16 lg:py-8">
      <Logo />
      <div></div>
      <div className="flex gap-4">
        <ThemeButton />
        <AuthButtonOrProfile />
      </div>
    </nav>
  )
}
