import { MAX_GRATITUDE_TEXT_LENGTH } from '@/entities/gratitude/model/rules'
import { toastError } from '@/shared/libs/toast'

import { useI18n } from '../i18n'

const useGratitudeInput = (setGratitude: (value: string) => void) => {
  const { t } = useI18n()

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_GRATITUDE_TEXT_LENGTH) {
      setGratitude(e.target.value)
    } else {
      toastError(t('toastError') as string)
    }
  }

  return {
    onInputChange,
  }
}

export default useGratitudeInput
