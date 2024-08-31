import { useState } from 'react'

import { useUpdateGreetingSettings } from '@/features/greeting-toast'
import { useSession } from '@/entities/session'
import { Switch } from '@/shared/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

import { useI18n } from '../i18n'

export const GreetingSwitch = () => {
  const { t } = useI18n()
  const session = useSession()
  const [checked, setChecked] = useState(session?.greetingSettings)
  const { mutate: updateGreeting } = useUpdateGreetingSettings()

  const handleCheckedChange = () => {
    setChecked(prev => !prev)
    updateGreeting(!checked)
  }

  return (
    <div className="mx-auto flex w-96 justify-between px-10 py-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className=" font-semibold text-primary-foreground">
              {t('greetings')}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('greeting_tooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Switch
        checked={checked}
        onCheckedChange={() => handleCheckedChange()}
      />
    </div>
  )
}
