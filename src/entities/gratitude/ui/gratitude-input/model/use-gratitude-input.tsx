import { MAX_GRATITUDE_TEXT_LENGTH } from '@/entities/gratitude/model/rules'
import { toastError } from '@/shared/libs/toast'

const useGratitudeInput = (setGratitude: (value: string) => void) => {
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_GRATITUDE_TEXT_LENGTH) {
      setGratitude(e.target.value)
    } else {
      toastError(`${MAX_GRATITUDE_TEXT_LENGTH} символов максимум`)
    }
  }

  return {
    onInputChange,
  }
}

export default useGratitudeInput
