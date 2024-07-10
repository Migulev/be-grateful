import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { useAuthModal } from '@/shared/libs/context/auth-modal-context'
import { toastError } from '@/shared/libs/toast'
import { cn, useResizeTextarea } from '@/shared/libs/utils'

import { MAX_GRATITUDE_TEXT_LENGTH } from '../model/rules'

export const GratitudeInput = ({
  className,
  placeholder,
  onCreateAsync,
  isPending,
  isAuthorized,
}: {
  className?: string
  placeholder: string
  onCreateAsync: (gratitudeText: string) => Promise<void>
  isPending: boolean
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
      className={cn(className, 'flex w-full max-w-xl')}
      onKeyDown={e => {
        if (e.key === 'Enter') handleSubmit(e)
      }}
    >
      <Textarea
        ref={textareaRef}
        onChange={handleInputChange}
        value={gratitude}
        placeholder={placeholder}
        autoFocus
        isInput
      />
      <Button
        type="submit"
        // !dev: color hardcode
        className="ml-2"
        disabled={isPending}
      >
        <Plus className="h-4" />
      </Button>
    </form>
  )
}
