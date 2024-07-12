import { useRef, useState } from 'react'

import { Textarea } from '@/shared/components/ui/textarea'
import { useAuthModal } from '@/shared/libs/context/auth-modal-context'
import { toastError } from '@/shared/libs/toast'
import { cn, useResizeTextarea } from '@/shared/libs/utils'

import { MAX_GRATITUDE_TEXT_LENGTH } from '../model/rules'

export const GratitudeInput = ({
  className,
  onCreateAsync,
  isAuthorized,
}: {
  className?: string
  onCreateAsync: (gratitudeText: string) => Promise<void>
  isAuthorized: boolean
}) => {
  const [gratitude, setGratitude] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useResizeTextarea(textareaRef, gratitude)
  const { setIsOpenAuthModal } = useAuthModal()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_GRATITUDE_TEXT_LENGTH) {
      setGratitude(e.target.value)
    } else {
      toastError('300 символов максимум')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isAuthorized) {
      setIsOpenAuthModal(true)
      return
    }
    if (gratitude) {
      await onCreateAsync(gratitude)
      setGratitude('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(className, 'relative flex w-full')}
      onKeyDown={e => {
        if (e.key === 'Enter') handleSubmit(e)
      }}
    >
      <span className="absolute ml-8 mt-[9px] text-lg text-muted-foreground">
        -
      </span>
      <Textarea
        isInput
        className="no-scrollbar overflow-y-auto bg-secondary pl-10 text-lg text-muted-foreground ring-offset-secondary focus-visible:ring-1"
        ref={textareaRef}
        onChange={handleInputChange}
        value={gratitude}
        placeholder={'...'}
        autoFocus
      />
      <span className="sr-only">Введите благодарность</span>
    </form>
  )
}
