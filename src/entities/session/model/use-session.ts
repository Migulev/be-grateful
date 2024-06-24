import { useQuery } from '@tanstack/react-query'

import { sessionQuery } from '../queries'
import { Session, sessionSchema } from './types'

export const useSession = (): Session | null => {
  const { data: session } = useQuery({
    ...sessionQuery(),
  })

  const validation = sessionSchema.safeParse(session)
  if (validation.error) {
    return null
  }

  return validation.data as Session
}
