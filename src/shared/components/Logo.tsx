import { Link } from 'react-router-dom'

import { ROUTER_PATHS } from '../constants'
import { type Theme } from '../libs/context/theme-context'

export const Logo = ({ theme }: { theme: Theme }) => {
  return (
    <Link to={ROUTER_PATHS.HOME}>
      <img
        src={theme === 'dark' ? '/dark-icon.svg' : '/light-icon.svg'}
        alt="logo"
        className="size-11"
        width={60}
        height={60}
      />
    </Link>
  )
}
