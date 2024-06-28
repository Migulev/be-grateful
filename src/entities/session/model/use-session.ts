import { useQuery } from '@tanstack/react-query'

import { sessionQuery } from '../queries'
import { Session } from './types'

export const useSession = (): Session => {
  const { data: session } = useQuery({
    ...sessionQuery(),
  })

  return session as Session
}
