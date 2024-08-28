import { useI18n } from '../i18n'

export const Hero = () => {
  const { t } = useI18n()

  return (
    <h1 className="text-2xl font-bold tracking-tight text-primary-foreground drop-shadow-sm sm:py-3 sm:text-3xl md:text-4xl xl:text-5xl">
      {t('title')}
    </h1>
  )
}
