import { NavLink } from 'react-router-dom'

import { ThemeButton } from '@/features/theme'
import { useSession } from '@/entities/session'
import { Logo } from '@/shared/components/Logo'
import { ROUTER_PATHS } from '@/shared/constants'
import { useAuthModal } from '@/shared/libs/context/auth-modal-context'
import { useTheme } from '@/shared/libs/context/theme-context'

import { AuthButtonOrProfile } from './auth-button-or-profile'

export const Topbar = () => {
  const { theme } = useTheme()
  const session = useSession()
  const { setIsOpenAuthModal } = useAuthModal()

  const handleProtectedLink = (e: { preventDefault: () => void }) => {
    if (!session) {
      e.preventDefault()
      setIsOpenAuthModal(true)
    }
  }

  return (
    <nav className="flex items-center justify-between py-5 md:px-10 md:py-6 lg:px-16 lg:py-8">
      <Logo theme={theme} />
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'underline underline-offset-2'
            : 'opacity-80 transition-opacity hover:opacity-100'
        }
        to={ROUTER_PATHS.STATS}
        onClick={handleProtectedLink}
      >
        статистика
      </NavLink>
      <div className="flex gap-4">
        <ThemeButton />
        <AuthButtonOrProfile />
      </div>
    </nav>
  )
}
