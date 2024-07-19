import { type Theme } from '../libs/context/theme-context'

export const Logo = ({ theme }: { theme: Theme }) => {
  return (
    <img
      src={theme === 'dark' ? '/icon-dark.png' : '/icon-light.png'}
      alt="logo"
      className="size-12"
      width={60}
      height={60}
    />
  )
}
