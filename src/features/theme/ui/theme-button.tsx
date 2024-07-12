import { Moon, Sun } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

import { useTheme } from '../model/theme-context'

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme == 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <>
      <Button
        size={'icon'}
        onClick={toggleTheme}
        className="relative"
      >
        {
          <>
            <Sun className="size-5 translate-x-0 opacity-100 [transition:opacity_200ms_ease-out,transform_300ms_ease-out] dark:-translate-x-5 dark:opacity-0" />
            <Moon className="absolute size-5 translate-x-5 opacity-0 [transition:opacity_200ms_ease-out,transform_300ms_ease-out] dark:translate-x-0 dark:opacity-100" />
          </>
        }
      </Button>
    </>
  )
}
