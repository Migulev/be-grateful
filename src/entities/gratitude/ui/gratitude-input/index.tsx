import { useRef, useState } from 'react'

import { ArrowRight } from 'lucide-react' // Add this import

import { Button } from '@/shared/components/ui/button' // Add this import
import { Textarea } from '@/shared/components/ui/textarea'
import { useDeviceType } from '@/shared/libs/device-type/device-type-context'
import { cn, useResizeTextarea } from '@/shared/utils'

import { useI18n } from './i18n'
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
  const { t } = useI18n()

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

  const { isTouchScreen } = useDeviceType()
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
        className={cn(
          'no-scrollbar overflow-y-auto bg-secondary pl-10 text-lg text-muted-foreground ring-offset-secondary focus-visible:ring-1',
          {
            'pr-14': isTouchScreen,
          },
        )}
        ref={textareaRef}
        onChange={onInputChange}
        value={gratitude}
        placeholder={'...'}
        autoFocus
      />
      {isTouchScreen && gratitude.length > 0 && (
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          size="sm"
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">submit</span>
        </Button>
      )}
      <span className="sr-only">{t('enterGratitude')}</span>
    </form>
  )
}
