import { Button } from '@/shared/components/ui/button'
import { useLang } from '@/shared/libs/context/i18n-context'

export const LangButton = () => {
  const { lang, setLang } = useLang()

  const toggleLang = () => {
    if (lang == 'en') {
      setLang('ru')
    } else {
      setLang('en')
    }
  }

  return (
    <Button
      size={'icon'}
      onClick={toggleLang}
      className="text-md relative"
    >
      {lang}
    </Button>
  )
}
