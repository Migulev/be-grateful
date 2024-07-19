import { ThemeButton } from '@/features/theme'
import { Logo } from '@/shared/components/Logo'
import { useTheme } from '@/shared/libs/context/theme-context'

import { AuthButtonOrProfile } from './auth-button-or-profile'

export const Topbar = () => {
  const { theme } = useTheme()

  return (
    <nav className="container flex items-center justify-between px-8 py-5 md:px-10 md:py-6 lg:px-16 lg:py-8">
      <Logo theme={theme} />
      <div></div>
      <div className="flex gap-4">
        <ThemeButton />
        <AuthButtonOrProfile />
      </div>
    </nav>
  )
}
