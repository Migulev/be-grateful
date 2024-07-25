import { useAuthModal } from '@/shared/libs/context/auth-modal-context'

const MAX_GRATITUDE_TEXT_LENGTH = 100 // Define or import this constant as needed

const useHandleSubmit = (
  isAuthorized: boolean,
  gratitude: string,
  onCreateAsync: (value: string) => Promise<void>,
  setGratitude: (value: string) => void,
) => {
  const { setIsOpenAuthModal } = useAuthModal()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isAuthorized) {
      setIsOpenAuthModal(true)
      return
    }
    if (gratitude && gratitude.length <= MAX_GRATITUDE_TEXT_LENGTH) {
      await onCreateAsync(gratitude)
      setGratitude('')
    }
  }

  return {
    handleSubmit,
  }
}

export default useHandleSubmit
