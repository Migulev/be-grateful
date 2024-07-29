import { greetingApi } from '@/shared/api/greeting'
import { ValidationError } from '@/shared/libs/errors'
import { getRandomNumber } from '@/shared/utils'

import { greetingSchema } from './types'

const greeting_query_key = 'greetings'

export const greetingQuery = (isEnabled: boolean) => ({
  queryKey: [greeting_query_key, isEnabled],
  queryFn: async () => {
    if (!isEnabled) return
    const greetingsList = await greetingApi.getGreetingsList()

    const randomNumber = getRandomNumber(0, greetingsList.length - 1)

    const greeting = greetingsList[randomNumber]
    const validation = greetingSchema.safeParse(greeting)
    if (validation.error) throw new ValidationError()

    return validation.data
  },
  enabled: isEnabled,
  refetchOnWindowFocus: false,
  staleTime: Infinity,
})
