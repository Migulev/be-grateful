import { ThemeButton } from '@/features/theme'
import { Logo } from '@/shared/components/Logo'

import { AuthButtonOrProfile } from './ui/auth-button-or-profile'

export const Topbar = () => {
  return (
    <nav className="container flex items-center justify-between px-8 py-8 md:px-10 md:py-10 lg:px-16 lg:py-16">
      <Logo />
      <div className="flex gap-4">
        <ThemeButton />
        <AuthButtonOrProfile />
      </div>
    </nav>
  )
}
