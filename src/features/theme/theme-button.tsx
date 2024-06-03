import { Moon, Sun } from 'lucide-react'

import { UiButton } from '@/shared/ui/components/ui-button'

import { useTheme } from './use-theme'

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme == 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const themIcon = theme === 'dark' ? 'moon' : 'sun'

  return (
    <>
      <UiButton
        size={'icon'}
        onClick={toggleTheme}
      >
        {
          <>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            {/* {themIcon} */}
          </>
        }
      </UiButton>
    </>
  )
}
