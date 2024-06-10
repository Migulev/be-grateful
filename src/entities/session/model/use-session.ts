import { useQuery } from '@tanstack/react-query'

import { sessionQuery } from '../queries'
import { Session } from './types'

export const useSession = (): Session | null => {
  const { data: session = null } = useQuery({
    ...sessionQuery(),
  })

  return session
}
