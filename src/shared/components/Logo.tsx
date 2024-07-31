import { type Theme } from '../libs/context/theme-context'

export const Logo = ({ theme }: { theme: Theme }) => {
  return (
    <img
      src={theme === 'dark' ? '/dark-icon.svg' : '/light-icon.svg'}
      alt="logo"
      className="size-11"
      width={60}
      height={60}
    />
  )
}
