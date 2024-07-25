import { useRef, useState } from 'react'

import { Textarea } from '@/shared/components/ui/textarea'
import { cn, useResizeTextarea } from '@/shared/libs/utils'

import useGratitudeInput from './model/use-gratitude-input'
import useHandleSubmit from './model/use-handle-submit'

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

  const { onInputChange } = useGratitudeInput(setGratitude)
  const { handleSubmit } = useHandleSubmit(
    isAuthorized,
    gratitude,
    onCreateAsync,
    setGratitude,
  )

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(className, 'relative flex w-full')}
      onKeyDown={e => {
        if (e.key === 'Enter') handleSubmit(e)
      }}
      role="form"
    >
      <span className="absolute ml-8 mt-[9px] text-lg text-muted-foreground">
        -
      </span>
      <Textarea
        isInput
        className="no-scrollbar overflow-y-auto bg-secondary pl-10 text-lg text-muted-foreground ring-offset-secondary focus-visible:ring-1"
        ref={textareaRef}
        onChange={onInputChange}
        value={gratitude}
        placeholder={'...'}
        autoFocus
      />
      <span className="sr-only">Введите благодарность</span>
    </form>
  )
}
